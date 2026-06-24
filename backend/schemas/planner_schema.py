# Planner schema

from pydantic import BaseModel, Field

from schemas.action_schema import ActionItem


class ToolArgs(BaseModel):

    attendees: list[str] | None = None
    
    description: str | None = None

    due_date: str | None = None
    
    end_time: str | None = None

    start_time: str | None = None

    title: str | None = None

    #GMAIL SPECIFIC
    body: str | None = None

    subject: str | None = None

    to: str | None = None


class ToolPlan(BaseModel):

    action: ActionItem

    tool: str

    tool_args: ToolArgs = Field(default_factory=ToolArgs)
