# Tool template

from abc import ABC, abstractmethod

from schemas.action_schema import ActionItem
from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolArgs


class BaseTool(ABC):
    
    name: str
    description: str


    @abstractmethod
    def execute(
        self, 
        action: ActionItem, 
        tool_args: ToolArgs
    ) -> ExecutionResult:
        
        pass
