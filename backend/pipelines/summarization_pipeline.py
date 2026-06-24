# Summarization + Validation

from pathlib import Path

from config.settings import settings
from observability.logger import logger
from observability.tracer import Tracer
from schemas.meeting_schema import Summary, Transcript
from schemas.validation_schema import ValidationError
from services.summarization_service import SummarizationService
from services.validation_service import ValidationService
from utils.file_writer import write_to_file


class SummarizationPipeline:


	def __init__(self):
		self.summarizer = SummarizationService()
		self.validator = ValidationService()

	
	def run(
		self,
		transcript: Transcript,
	) -> Summary:
		
		with Tracer.span("summarization_pipeline"):	
			
			for attempt in range(settings.MAX_RETRIES):

				summary = self.summarizer.summarize(
					transcript.text
				)
				
				validation = self.validator.validate_summary(
					transcript=transcript,
					summary=summary
				)

				write_to_file(Path(settings.DATA_PATH_TEMP) / "validations/temp_summary_validation.txt", validation)

				if validation.score >= settings.VALIDATION_THRESHOLD:
					return summary

				logger.warning(
					f"Summary validation failed (score: {validation.score}) "
					f"Retrying... (attempt={attempt+1})"			
				)

			else:
				logger.error("Unable to generate valid summary.")
				raise ValidationError(validation)
