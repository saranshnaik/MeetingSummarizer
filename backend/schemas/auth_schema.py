# auth schema

from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
	
	email: EmailStr
	
	password: str


class RegisterRequest(BaseModel):
	
	email: EmailStr
	
	full_name: str
	
	password: str


class UserResponse(BaseModel):

	email: EmailStr

	full_name: str | None = None
	
	id: int | None = None

	is_active: bool = True

	role: str


class TokenResponse(BaseModel):

	access_token: str

	token_type: str = "bearer"

	user: UserResponse
