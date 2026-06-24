# API schema

from typing import TypeVar

from pydantic import BaseModel

from schemas.meeting_schema import MeetingOutput

T = TypeVar("T")


class Meta(BaseModel):                  # For additional enhancements in the future
    
    page: int | None = None
    
    page_size: int | None = None
    
    request_id: str | None = None
    
    total: int | None = None


class APIResponse[T](BaseModel):

    data: MeetingOutput | None = None

    message: str | None = None

    meta: Meta | None = None

    success: bool = True


class ErrorDetail(BaseModel):
    
    code: str
    
    field: str | None = None
    
    message: str


class ErrorResponse(BaseModel):
    
    error: ErrorDetail
    
    success: bool = False
