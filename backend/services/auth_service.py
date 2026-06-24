# Auth service

from sqlalchemy.orm import Session

from auth.jwt_handler import create_access_token
from db.models.user_model import User
from db.repositories.user_repository import UserRepository
from schemas.auth_schema import RegisterRequest
from utils.password_handler import hash_password, verify_password


class AuthService:


	@staticmethod
	def register(
		db: Session,
		payload: RegisterRequest
	):
		
		existing_user = (
			UserRepository.get_user_by_email(
				db,
				payload.email
			)
		)

		if existing_user:
			return None
		
		user = User(
			email=payload.email,
			hashed_password=hash_password(payload.password),
			full_name=payload.full_name,
			role="user",
			is_active=True 
		)

		created_user = UserRepository.create_user(
			db,
			user
		)

		token = create_access_token({
			"sub": str(created_user.id),
			"email": created_user.email,
			"role": created_user.role
		})

		return {
			"access_token": token,
			"user": {
				"id": created_user.id,
				"email": created_user.email,
				"full_name": created_user.full_name,
				"role": created_user.role,
				"is_active": created_user.is_active
			}
		}


	@staticmethod
	def login(
		db: Session,
		email: str,
		password: str
	):
		
		user = UserRepository.get_user_by_email(
			db,
			email
		)

		if not user:
			return None
		
		if not verify_password(
			password,
			user.hashed_password
		):
			return None
		
		token = create_access_token({
			"sub": str(user.id),
			"email": user.email,
			"role": user.role
		})

		return {
			"access_token": token,
			"user": {
				"id": user.id,
				"email": user.email,
				"full_name": user.full_name,
				"role": user.role,
				"is_active": user.is_active
			}
		}
