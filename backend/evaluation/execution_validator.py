# Execution validator

from evaluation.judge import Judge
from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolPlan
from schemas.validation_schema import ValidationResult


class ExecutionValidator:


	@staticmethod
	def validate(
		plan: ToolPlan,
		execution_result: ExecutionResult
	) -> ValidationResult:
		
		return Judge.evaluate(
			task_name="Action Execution",
			source_context=plan.model_dump_json(indent=2),
			generated_output=execution_result.model_dump_json(indent=2)
		)
