# Plan validator

from evaluation.judge import Judge
from schemas.action_schema import ActionItem
from schemas.planner_schema import ToolPlan
from schemas.validation_schema import ValidationResult


class PlanValidator:


	@staticmethod
	def validate(
		action: ActionItem,
		planner_output: ToolPlan
	) -> ValidationResult:
		
		return Judge.evaluate(
			task_name="Execution Planning",
			source_context=action.model_dump_json(indent=2),
			generated_output=planner_output
		)
