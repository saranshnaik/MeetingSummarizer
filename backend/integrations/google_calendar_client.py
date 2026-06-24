# Calendar API
# 1,000,000 requests per project per day

from datetime import datetime, timedelta

from integrations.auth.google_auth import GoogleAuth
from observability.tracer import Tracer


class GoogleCalendarClient:
    

    def __init__(self):
        auth = GoogleAuth()
        self.service = auth.get_service('calendar', 'v3')
    
        
    def create_event(
            self,
            title,
            start_time: str,
            end_time: str = None,
            description: str = None,
            attendees: list[str] | None = None
        ):
        
        with Tracer.span("create_calendar_event"):
            start_dt = datetime.fromisoformat(str(start_time))
            end_dt = (
                (start_dt + timedelta(hours=1)) 
                if end_time is None 
                else datetime.fromisoformat(str(end_time))
            )
            event = {
                "summary": title,
                "description": description,
                "start": {
                    "dateTime": start_dt.isoformat(),
                    "timeZone": "Asia/Kolkata"
                },
                "end": {
                    "dateTime": end_dt.isoformat(),
                    "timeZone": "Asia/Kolkata"
                }
            }

            if attendees:
                event["attendees"] = [
                    {"email": email}
                    for email in attendees
                ]
    
            created_event = self.service.events().insert(
                calendarId='primary',
                body=event,
                sendUpdates="all"
            ).execute()
    
            return created_event
