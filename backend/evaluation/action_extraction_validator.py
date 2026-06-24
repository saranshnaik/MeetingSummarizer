# Action extraction validator

from evaluation.judge import Judge
from schemas.action_schema import ActionItem
from schemas.meeting_schema import Summary
from schemas.validation_schema import ValidationResult


class ActionExtractionValidator:


	@staticmethod
	def validate(
		summary: Summary,
		extracted_actions: list[ActionItem]
	) -> ValidationResult:
		
		source_context = """
		For the given summary, check if all possible actions were extracted.

		SUMMARY:
		""" + summary.text
		
		generated_output = "\n\n".join(action.model_dump_json(indent=2) for action in extracted_actions)
		
		return Judge.evaluate(
			task_name="Action Extraction",
			source_context=source_context,
			generated_output=generated_output
		)
