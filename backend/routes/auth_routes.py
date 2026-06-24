# Auth routes

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from db.session import get_db
from observability.logger import logger
from schemas.auth_schema import LoginRequest, RegisterRequest, TokenResponse, UserResponse
from services.auth_service import AuthService

router = APIRouter(
	prefix="/auth",
	tags=["auth"]
)


auth_service = AuthService()


@router.post(
	"/register",
	response_model=TokenResponse
)
def register(
	request: RegisterRequest,
	db: Session = Depends(get_db)
):
	
	logger.info("Received register request.")

	result = auth_service.register(
		db,
		request
	)

	if not result:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="User already exists"
		)
	
	return result


@router.post(
	"/login",
	response_model=TokenResponse
)
def login(
	request: LoginRequest,
	db: Session = Depends(get_db)
): 
	
	logger.info("Received login request.")

	result = auth_service.login(
		db,
		request.email,
		request.password
	)

	if not result:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid credentials"
		)

	return result


@router.get(
	"/me",
	response_model=UserResponse
)
def get_me(
	current_user = Depends(get_current_user)
):
	
	return {
		"id": current_user.id,
		"email": current_user.email,
		"full_name": current_user.full_name,
		"role": current_user.role,
		"is_active": current_user.is_active
	}
