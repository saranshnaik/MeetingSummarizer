# Execution agent

from pathlib import Path

from agents.base_agent import BaseAgent
from config.settings import settings
from llms.prompt_manager import PromptManager
from observability.logger import logger
from observability.tracer import Tracer
from schemas.execution_schema import ExecutionAgentResponse, ExecutionValidation
from schemas.planner_schema import ToolPlan
from tools.tool_registry import TOOLS
from utils.file_writer import write_to_file


class ExecutionAgent(BaseAgent):


	def __init__(self, model: str = settings.OLLAMA_CLOUD_MODEL):
		super().__init__(model=model)


	def _execution_guardrail(
		self,
		plan: ToolPlan
	) -> ExecutionValidation:
		
		template = PromptManager.load_prompt("execution_user_prompt")

		user_prompt = template.format(
			tool=plan.tool,
			action=plan.action.model_dump_json(indent=2),
			tool_args=plan.tool_args.model_dump_json(indent=2)
		)

		system_prompt = PromptManager.load_prompt("execution_prompt")

		guardrail = self.generate(
			system_prompt=system_prompt,
			user_prompt=user_prompt,
			schema_model=ExecutionValidation
		)

		write_to_file(Path(settings.DATA_PATH_TEMP) / "temp_guardrail.txt", guardrail)

		return guardrail


	def execute_plan(
		self,
		plan: ToolPlan
	) -> ExecutionAgentResponse:		

		with Tracer.span("tool_plan_check"):
			tool = TOOLS.get(plan.tool)

			if not tool:

				logger.error("Failed tool plan check: Unsupported tool.")

				return ExecutionAgentResponse(
					success=False,
					status="unsupported_tool",
					tool=plan.tool
				)
			
			guardrail = self._execution_guardrail(plan)

			if not guardrail.can_execute:

				logger.error(f"Failed tool plan check: {guardrail.execution_notes}")

				return ExecutionAgentResponse(
					success=False,
					status="blocked",
					tool=plan.tool,
					message=guardrail.execution_notes
				)
			
		try:
			
			with Tracer.span("tool_execution"):
				
				result = tool.execute(
					action=plan.action,
					tool_args=plan.tool_args
				)

				execution_output = {
					"tool": plan.tool,
					"action": plan.action.model_dump_json(indent=2),
					"tool_args": plan.tool_args.model_dump_json(indent=2),
					"result": result.model_dump_json(indent=2)
				}

				write_to_file(Path(settings.DATA_PATH_TEMP) / "temp_execution.txt", execution_output)
					
				return ExecutionAgentResponse(
					success=True,
					status="success",
					tool=plan.tool,
					result=result,
				)
			
		except Exception as e:
				
			logger.exception(f"Failed to execute tool: {str(e)}")

			return ExecutionAgentResponse(
				success=False,
				status="failed",
				tool=plan.tool,
				message=str(e),
			)
