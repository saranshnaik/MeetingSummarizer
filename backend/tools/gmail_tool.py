# Tool to use Gmail

from integrations.gmail_client import GmailClient
from observability.logger import logger
from schemas.action_schema import ActionItem
from schemas.execution_schema import ExecutionResult
from schemas.planner_schema import ToolArgs
from tools.base_tools import BaseTool


class GmailTool(BaseTool):

    name = "gmail_send"

    description = """
        Send an email using Gmail.
        Requires:
         - to
         - subject
         - body
    """


    def __init__(self):
        
        self.client = GmailClient()


    def execute(
        self, 
        action: ActionItem,
        tool_args: ToolArgs
    ) -> ExecutionResult:
        
        try:
            
            sent_email = self.client.send_email(
                to=tool_args.to,
                subject=action.title,
                body=action.description or ""
            )

            return ExecutionResult(
                title=action.title,
                type=action.type,
                provider="gmail",
                resource_id=sent_email.get("id"),
                resource_url=None,
                status="sent"
            )
        
        except Exception as e:

            logger.exception(f"Failed to execute Mail tool: {str(e)}")

            return ExecutionResult(
                title=action.title,
                type=action.type,
                provider="gmail",
                status="failed"
            )
