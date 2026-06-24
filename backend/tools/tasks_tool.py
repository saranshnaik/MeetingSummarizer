# Tool to use tasks

from integrations.google_tasks_client import GoogleTasksClient
from observability.logger import logger
from schemas.action_schema import ActionItem
from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolArgs
from tools.base_tools import BaseTool


class TasksTool(BaseTool):

    name = "google_tasks_create"

    description = """
        Create Google task.
        Requires:
         - title
         - notes
         - due
    """


    def __init__(self):
        
        self.client = GoogleTasksClient()


    def execute(
        self, 
        action: ActionItem,
        tool_args: ToolArgs
    ) -> ExecutionResult:
        
        try:
            
            created_task = self.client.create_task(
                title=tool_args.title,
                notes=tool_args.description,
                due=tool_args.due_date
            )

            return ExecutionResult(
                title=action.title,
                type=action.type,
                provider="google_tasks",
                resource_id=created_task.get("id"),
                resource_url=created_task.get("webViewLink"),
                status=created_task.get("status", "created")
            )
    
        except Exception as e:

            logger.exception(f"Failed to create task: {str(e)}")

            return ExecutionResult(
                title=action.title,
                type=action.type,
                provider="google_tasks",
                status="failed",
                error=str(e)
            )
