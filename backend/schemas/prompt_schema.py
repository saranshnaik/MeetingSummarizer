# Prompt schema

from datetime import datetime

from pydantic import BaseModel


class PromptCreate(BaseModel):

	content: str

	created_by: str

	prompt_name: str

	prompt_type: str


class PromptResponse(BaseModel):

	content: str

	created_at: datetime

	created_by: str

	id: int

	is_active: bool

	prompt_name: str

	prompt_type: str

	version: int


class PromptRollback(BaseModel):

	prompt_name: str

	version: int
