# Google account OAuth

import os

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

from observability.logger import logger

SCOPES = ["https://www.googleapis.com/auth/tasks",
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/gmail.send'
]


TOKEN_PATH = 'config/token.json'
CREDENTIALS_PATH = 'config/credentials.json'


class GoogleAuth:


    def __init__(self):
        creds = None

        if os.path.exists(TOKEN_PATH):
            creds = Credentials.from_authorized_user_file(
                TOKEN_PATH, 
                SCOPES
            )
        
        if creds and creds.expired and creds.refresh_token:
            logger.info("Refreshing expired tokens.")
            creds.refresh(Request())

        elif not creds or not creds.valid:

            logger.info("Started authorization process.")

            flow = InstalledAppFlow.from_client_secrets_file(
                CREDENTIALS_PATH,
                SCOPES
            )

            creds = flow.run_local_server(
                port=0,
                access_type="offline",
                prompt="consent"
            )

            with open(TOKEN_PATH, 'w') as token:
                token.write(creds.to_json())

            logger.info("Finished authorization process.")

        with open(TOKEN_PATH,"w") as token:
            token.write(creds.to_json())


    def get_service(
            self, 
            api_name: str, 
            api_version: str
        ):

        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
        service = build(api_name, api_version, credentials=creds)

        return service
