# Orchestration schema

from pydantic import BaseModel

from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolPlan
from schemas.reflection_schema import ReflectionResult


class OrchestrationResult(BaseModel):

	execution_result: ExecutionResult

	planner_result: ToolPlan

	reflection_result: ReflectionResult | None = None
