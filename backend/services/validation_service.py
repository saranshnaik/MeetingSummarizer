# Validation service

from evaluation.action_extraction_validator import ActionExtractionValidator
from evaluation.action_validator import ActionValidator
from evaluation.execution_validator import ExecutionValidator
from evaluation.plan_validator import PlanValidator
from evaluation.reflection_validator import ReflectionValidator
from evaluation.summary_validator import SummaryValidator
from schemas.action_schema import ActionItem
from schemas.execution_schema import ExecutionResult
from schemas.meeting_schema import Summary, Transcript
from schemas.planner_schema import ToolPlan
from schemas.reflection_schema import ReflectionResult
from schemas.validation_schema import ValidationResult


class ValidationService:


	@staticmethod
	def validate_action_extraction(
		summary: Summary,
		extracted_actions: list[ActionItem]
	) -> ValidationResult:

		return ActionExtractionValidator.validate(
			summary=summary,
			extracted_actions=extracted_actions
		)		
	

	@staticmethod
	def validate_action(
		action: ActionItem
	) -> ValidationResult:

		return ActionValidator.validate(
			action=action
		)
	
	
	@staticmethod
	def validate_execution(
		plan: ToolPlan,
		execution_result: ExecutionResult
	) -> ValidationResult:

		return ExecutionValidator.validate(
			plan=plan,
			execution_result=execution_result
		)
	

	@staticmethod
	def validate_planner(
		action: ActionItem,
		planner_output: ToolPlan
	) -> ValidationResult:

		return PlanValidator.validate(
			action=action,
			planner_output=planner_output
		)	
	

	@staticmethod
	def validate_reflection(
		action: ActionItem,
		plan: ToolPlan,
		execution_result: ExecutionResult,
		reflection_result: ReflectionResult
	) -> ValidationResult:

		return ReflectionValidator.validate(
			action=action,
			plan=plan,
			execution_result=execution_result,
			reflection_result=reflection_result
		)
	

	@staticmethod
	def validate_summary(
		transcript: Transcript,
		summary: Summary
	) -> ValidationResult:

		return SummaryValidator.validate(
			transcript=transcript,
			summary=summary
		)
