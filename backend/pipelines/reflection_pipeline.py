# Reflection + Validation

from pathlib import Path

from agents.reflection_agent import ReflectionAgent
from config.settings import settings
from observability.logger import logger
from observability.tracer import Tracer
from schemas.action_schema import ActionItem
from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolPlan
from schemas.reflection_schema import ReflectionResult
from schemas.validation_schema import ValidationError
from services.validation_service import ValidationService
from utils.file_writer import write_to_file


class ReflectionPipeline:


	def __init__(self):
		self.reflector = ReflectionAgent()
		self.validator = ValidationService()


	def run(
		self,
		action: ActionItem,
		plan: ToolPlan,
		execution_result: ExecutionResult
	) -> ReflectionResult:
		
		with Tracer.span("reflection_pipeline"):
			
			for attempt in range(settings.MAX_RETRIES):

				reflection = self.reflector.reflect(
					action=action,
					plan=plan,
					execution_result=execution_result
				)

				validation = self.validator.validate_reflection(
					action=action,
					plan=plan,
					execution_result=execution_result,
					reflection_result=reflection
				)

				write_to_file(Path(settings.DATA_PATH_TEMP) / "validations/temp_reflection_validation.txt", validation)
				
				if validation.score >= settings.VALIDATION_THRESHOLD:
					return reflection

				logger.warning(
					f"Reflection validation failed (score: {validation.score})"
					f"Retrying... (attempt={attempt+1})"			
				)

			else:
				logger.error("Unable to generate valid reflection.")
				raise ValidationError(validation)
