# Reflection schema

from typing import Literal

from pydantic import BaseModel


class ReflectionResult(BaseModel):

	quality: Literal[
		"good",
		"moderate",
		"bad"
	]

	retry_needed: bool

	retry_reason: str

	success: bool

	user_message: str | None = None
