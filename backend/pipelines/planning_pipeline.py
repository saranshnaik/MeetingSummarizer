# Planning + Validation

from pathlib import Path

from agents.planner_agent import PlannerAgent
from config.settings import settings
from observability.logger import logger
from observability.tracer import Tracer
from schemas.action_schema import ActionItem
from schemas.planner_schema import ToolPlan
from schemas.validation_schema import ValidationError
from services.validation_service import ValidationService
from utils.file_writer import write_to_file


class PlanningPipeline:


	def __init__(self):
		self.planner = PlannerAgent()
		self.validator = ValidationService()


	def run(
		self,
		action: ActionItem
	) -> ToolPlan:
		
		with Tracer.span("planning_pipeline"):

			for attempt in range(settings.MAX_RETRIES):

				plan = self.planner.plan(
					action=action
				)

				validation = (
					self.validator.validate_planner(
						action=action,
						planner_output=plan
					)
				)

				write_to_file(Path(settings.DATA_PATH_TEMP) / "validations/temp_planner_validation.txt", validation)

				if validation.score >= settings.VALIDATION_THRESHOLD:
					return plan
				
				logger.warning(
					f"Planner validation failed (score: {validation.score})"
					f"Retrying... (attempt={attempt+1})"
				)

			else:
				logger.error("Unable to generate valid plan.")
				raise ValidationError(validation)
