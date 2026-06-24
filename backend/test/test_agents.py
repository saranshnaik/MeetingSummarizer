# Test agents

from agents.base_agent import BaseAgent					#	generate(system_prompt: str, user_prompt: str, temperature: float, max_tokens: int, schema_model: type[BaseModel]) -> Any
from agents.execution_agent import ExecutionAgent		#	execute_plan(plan: ToolPlan) -> ExecutionAgentResponse
from agents.planner_agent import PlannerAgent			# 	plan(action: ActionItem) -> ToolPlan
from agents.reflection_agent import ReflectionAgent		#	reflect(action, plan, execution_result) -> ReflectionResult


input = "Test input" 	# Specific agent input

output = BaseAgent.function(**input)

print(repr(output))
