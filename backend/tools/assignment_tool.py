# Task for someone else (calendar invite)

from integrations.google_calendar_client import GoogleCalendarClient
from observability.logger import logger
from schemas.action_schema import ActionItem
from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolArgs
from tools.base_tools import BaseTool


class AssignmentTool(BaseTool):

	name = "assignment_create"

	description = """
	Assign work by creating calendar event
	and inviting assignee as guest.
	"""


	def __init__(self):

		self.client = GoogleCalendarClient()


	def execute(
		self, 
		action: ActionItem,
		tool_args: ToolArgs
	) -> ExecutionResult:
		
		try:

			start_time = None
			end_time = None

			start_time = (
				tool_args.start_time
				if tool_args.start_time is not None
				else tool_args.due_date
			)

			event = self.client.create_event(
				title=tool_args.title,
				start_time=start_time,
				end_time=end_time,
				description=tool_args.description,
				attendees=tool_args.attendees
			)

			return ExecutionResult(
				title=action.title,
				type=action.type,
				provider="google_calendar",
				resource_id=event.get("id"),
				resource_url=event.get("htmlLink"),
				status="assigned"
			)
		
		except Exception as e:

			logger.exception(f"Assignment failed: {str(e)}")

			# return ExecutionResult(
			# 	title=action.title,
			# 	type=action.type,
			# 	provider="google_calendar",
			# 	status="failed",
			# 	error=str(e)
			# )
