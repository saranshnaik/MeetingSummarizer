# Action execution validator

from evaluation.judge import Judge
from schemas.action_schema import ActionItem
from schemas.validation_schema import ValidationResult


class ActionValidator:


	@staticmethod
	def validate(
		action: ActionItem
	) -> ValidationResult:
		
		source_context = """
		For the given action, check the following:
		title: must be short and precise
		description: must be relevant to the title
		assignee: must always be a proper noun, if present, like the name of a person; it can also be null-valued
		type: must only be of the type 'meeting' OR 'task' OR 'reminder' OR 'email'
		priority: must be correctly inferred as either 'low' OR 'medium' OR 'high', based on the title and description
		completed: must always be false
		"""

		return Judge.evaluate(
			task_name="Action Object Validation",
			source_context=source_context,
			generated_output=action.model_dump_json(indent=2)
		)
