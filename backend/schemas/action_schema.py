# Action schema

from typing import Literal
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, Field, computed_field

ActionType = Literal[
    "email",
    "meeting",
    "reminder",
    "task"
]


PriorityType = Literal[
    "low",
    "medium",
    "high"
]


class ActionItem(BaseModel):
    
    assignee: str | None = None

    completed: bool = False
    
    description: str | None = Field(None, description="Additional context")

    due_date: str | None = None
    
    end_time: str | None = None

    model_config = ConfigDict(extra="ignore")
    
    priority: PriorityType | None
    
    start_time: str | None = None
    
    title: str = Field(..., description="Short descriptive title")

    type: ActionType

    # @computed_field
    # @property
    # def id(self) -> str:
    #     return str(uuid4())[:10]
    id: str = Field(default_factory=lambda: str(uuid4)[:10])


class ActionItemPatch(BaseModel):
    
    assignee: str | None = None

    completed: bool | None = None
    
    description: str | None = None

    due_date: str | None = None
    
    end_time: str | None = None
    
    priority: PriorityType | None = None
    
    start_time: str | None = None

    title: str | None = None
    
    type: ActionType | None = None


class ActionList(BaseModel):
    
    actions: list[ActionItem]
