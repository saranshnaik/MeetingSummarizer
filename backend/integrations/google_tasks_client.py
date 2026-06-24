# Tasks API
# It is governed by quota limits rather than a direct pay-per-use fee (first 1 million operations free)

from datetime import UTC, datetime

from integrations.auth.google_auth import GoogleAuth
from observability.logger import logger
from observability.tracer import Tracer


class GoogleTasksClient:


    def __init__(self):
        auth = GoogleAuth()
        self.service = auth.get_service('tasks', 'v1')


    def _format_due_date(self, due):

        if not due:
            return None
        
        try:
            dt = datetime.fromisoformat(
                due.replace("Z", "+00:00")
            )

            dt = dt.astimezone(UTC)

            normalized = datetime(
                year=dt.year,
                month=dt.month,
                day=dt.day,
                tzinfo=UTC
            )

            return normalized.strftime(
                "%Y-%m-%dT00:00:00.000Z"
            )
        
        except Exception:
            logger.warning(f"Invalid due date format: {due}")
            return None


    def create_task(
            self, 
            title: str, 
            notes: str = None,
            status:str = "needsAction", 
            due: str = None
        ):
        
        with Tracer.span("create_task_or_reminder"):
            
            task = {
                "title": title,
                "status": status,
            }
    
            if notes:
                task["notes"] = notes
    
            formatted_due = self._format_due_date(due)
    
            if formatted_due:
                task["due"] = formatted_due
    
            created_task = self.service.tasks().insert(
                tasklist='@default',
                body=task
            ).execute()

        return created_task
