# Access all tools

from tools.assignment_tool import AssignmentTool
from tools.calendar_tool import CalendarTool
from tools.gmail_tool import GmailTool
from tools.tasks_tool import TasksTool

TOOLS = {
	"assignment_create": AssignmentTool(),
    "gmail_send": GmailTool(),
    "calendar_create_event": CalendarTool(),
    "google_tasks_create": TasksTool()
}
