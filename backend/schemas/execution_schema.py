# Execution schema

from typing import Literal

from pydantic import BaseModel


class ExecutionResult(BaseModel):
    
    error: str | None = None

    provider: str | None = None

    resource_id: str | None = None
    
    resource_url: str | None = None

    status: str

    title: str

    type: str


class ExecutionResponse(BaseModel):

    data: ExecutionResult

    message: str | None = None

    success: bool


class ErrorDetail(BaseModel):
    
    code: str

    field: str | None = None
    
    message: str


class ErrorResponse(BaseModel):
    
    error: ErrorDetail
    
    success: bool = False


class ExecutionAgentResponse(BaseModel):

    message: str | None = None

    result: ExecutionResult | None = None

    success: bool

    status: Literal[
        "success",
        "unsupported_tool",
        "blocked",
        "failed"
    ]

    tool: str
    

class ExecutionValidation(BaseModel):

    can_execute: bool

    execution_notes: str

    needs_retry: bool

    retry_reason: str
