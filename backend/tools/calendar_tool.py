# Tool to use calendar

from integrations.google_calendar_client import GoogleCalendarClient
from observability.logger import logger
from schemas.action_schema import ActionItem
from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolArgs
from tools.base_tools import BaseTool


class CalendarTool(BaseTool):

    name = "calendar_create_event"

    description = """
        Create calendar event.
        Requires:
         - title
         - start_time
         - end_time
    """


    def __init__(self):
        
        self.client = GoogleCalendarClient()


    def execute(
        self, 
        action: ActionItem,
        tool_args: ToolArgs
    ) -> ExecutionResult:
        
        try:

            created_event = self.client.create_event(
                title=tool_args.title,
                start_time=tool_args.start_time,
                end_time=tool_args.end_time,
            )

            return ExecutionResult(
                title=action.title,
                type=action.type,
                provider="google_calendar",
                resource_id=created_event.get("id"),
                resource_url=created_event.get("htmlLink"),
                status="created"
            )

        except Exception as e:

            logger.exception(f"Failed to create Calendar event: {str(e)}")

            return ExecutionResult(
                title=action.title,
                type=action.type,
                provider="google_calendar",
                status="failed"
            )
