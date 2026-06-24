# Reflection validator

from evaluation.judge import Judge
from schemas.action_schema import ActionItem
from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolPlan
from schemas.reflection_schema import ReflectionResult
from schemas.validation_schema import ValidationResult


class ReflectionValidator:


	@staticmethod
	def validate(
		action: ActionItem,
		plan: ToolPlan,
		execution_result: ExecutionResult,
		reflection_result: ReflectionResult
	) -> ValidationResult:

		source_context = f"""
		ACTION:
		{action.model_dump_json(indent=2)}

		PLAN:
		{plan}

		EXECUTION RESULT:
		{execution_result.model_dump_json(indent=2)}
		"""

		return Judge.evaluate(
			task_name="Action Extraction",
			source_context=source_context,
			generated_output=reflection_result.model_dump_json(indent=2)
		)
