# Gmail API
# 1.2 million units per minute per project, with a specific limit of 6,000 units per user per minute

import base64
from email.mime.text import MIMEText

from integrations.auth.google_auth import GoogleAuth
from observability.tracer import Tracer


class GmailClient:


    def __init__(self):
        auth = GoogleAuth()
        self.service = auth.get_service('gmail', 'v1')


    def send_email(
        self, 
        to: str, 
        subject: str, 
        body: str
    ):

        with Tracer.span("send_mail"):
            
            message = MIMEText(body)
        
            message['to'] = to
            message['subject'] = subject
    
            raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    
            message_body = {
                'raw': raw_message
            }
            
            sent_message = self.service.users().messages().send(
                userId='me',
                body=message_body
            ).execute()

        return sent_message
