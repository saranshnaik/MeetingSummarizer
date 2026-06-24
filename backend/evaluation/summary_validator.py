# Summary validator

from evaluation.judge import Judge
from schemas.meeting_schema import Summary, Transcript
from schemas.validation_schema import ValidationResult


class SummaryValidator:


	@staticmethod
	def validate(
		transcript: Transcript,
		summary: Summary
	) -> ValidationResult:
		
		return Judge.evaluate(
			task_name="Meeting Summary",
			source_context=transcript.text,
			generated_output=summary.text
		)
