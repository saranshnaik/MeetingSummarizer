# Meeting schema

from pydantic import BaseModel, HttpUrl

from schemas.action_schema import ActionItem


class MeetingInput(BaseModel):

    file_path: str | None = None
    
    source_url: HttpUrl | None = None


class Transcript(BaseModel):
    
    duration_seconds: float | None = None

    file_path: str | None
    
    language: str | None = None
    
    text: str


class Summary(BaseModel):
   
    text: str


class MeetingOutput(BaseModel):
    
    actions: list[ActionItem]

    summary: Summary
    
    transcript: Transcript
