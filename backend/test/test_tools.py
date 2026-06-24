# Test tool

from tools.assignment_tool import AssignmentTool	#	execute(action: ActionItem, tool_args: ToolArgs) -> ExecutionResult
from tools.base_tools import BaseTool				#	execute(action: ActionItem, tool_args: ToolArgs) -> ExecutionResult
from tools.calendar_tool import CalendarTool		# 	execute(action: ActionItem, tool_args: ToolArgs) -> ExecutionResult
from tools.gmail_tool import GmailTool				#	execute(action: ActionItem, tool_args: ToolArgs) -> ExecutionResult
from tools.tasks_tool import TasksTool				# 	execute(action: ActionItem, tool_args: ToolArgs) -> ExecutionResult


input = "Test input" #(action: ActionItem, tool_args: ToolArgs)

output = AssignmentTool.execute(**input)

print(repr(output))
