# Execution + Validation

from pathlib import Path

from agents.execution_agent import ExecutionAgent
from config.settings import settings
from observability.logger import logger
from observability.tracer import Tracer
from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolPlan
from schemas.validation_schema import ValidationError
from services.validation_service import ValidationService
from utils.file_writer import write_to_file


class ExecutionPipeline:


	def __init__(self):
		self.executor = ExecutionAgent()
		self.validator = ValidationService()


	def run(
		self,
		plan: ToolPlan
	) -> ExecutionResult:
		
		with Tracer.span("execution_pipeline"):

			for attempt in range(settings.MAX_RETRIES):


				execution_response = self.executor.execute_plan(
					plan=plan
				)

				if execution_response.status != "success":
					logger.error(f"Execution failed: {execution_response.message}")
					raise
				
				execution_result = execution_response.result

				validation = self.validator.validate_execution(
					plan=plan,
					execution_result=execution_result
				)

				write_to_file(Path(settings.DATA_PATH_TEMP) / "validations/temp_execution_validation.txt", validation)
				
				if validation.score >= settings.VALIDATION_THRESHOLD:
					return execution_result

				logger.warning(
					f"Execution validation failed (score: {validation.score})"
					f"Retrying... (attempt={attempt+1})"			
				)

			else:
				logger.error("Unable to execute action.")
				raise ValidationError(validation)
