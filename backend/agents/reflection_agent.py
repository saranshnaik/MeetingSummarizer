# Check agentic errors

from pathlib import Path

from agents.base_agent import BaseAgent
from config.settings import settings
from llms.prompt_manager import PromptManager
from observability.tracer import Tracer
from schemas.reflection_schema import ReflectionResult
from utils.file_writer import write_to_file


class ReflectionAgent(BaseAgent):


	def __init__(
		self,
		model=settings.OLLAMA_CLOUD_MODEL
	):
		
		super().__init__(model=model)


	def reflect(
		self,
		action, 
		plan,
		execution_result
	) -> ReflectionResult:

		with Tracer.span(f"plan_reflection: action={action.title[:20]}..."):

			template = PromptManager.load_prompt("reflection_user_prompt")

			user_prompt = template.format(
				action=action.model_dump_json(indent=2),
				plan=plan.model_dump_json(indent=2),
				execution_result=execution_result.model_dump_json(indent=2)
			)

			system_prompt = PromptManager.load_prompt("reflection_prompt")

			reflection = self.generate(
				system_prompt=system_prompt,
				user_prompt=user_prompt,
				temperature=0,
				schema_model=ReflectionResult
			)

			write_to_file(Path(settings.DATA_PATH_TEMP) / "temp_reflection.txt", reflection)

		return reflection
