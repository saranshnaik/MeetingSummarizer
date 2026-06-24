# Auth dependencies

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy.orm import Session

from auth.jwt_handler import decode_access_token
from db.repositories.user_repository import UserRepository
from db.session import get_db

security = HTTPBearer()


def get_current_user(
		credentials: HTTPAuthorizationCredentials  = Depends(security),
		db: Session = Depends(get_db)
): 
	
	token = credentials.credentials

	try:

		payload = decode_access_token(token)

		user_id = payload.get("sub")

		if not user_id:
			raise HTTPException(
				status_code=status.HTTP_401_UNAUTHORIZED,
				detail="Invalid token payload"
			)
		
		user = UserRepository.get_user_by_id(
			db,
			int(user_id)
		)

		if not user:
			raise HTTPException(
				status_code=status.HTTP_401_UNAUTHORIZED,
				detail="User not found"
			)
		return user
		
	except JWTError as e:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid token"
		) from e


def require_admin(
	current_user = Depends(get_current_user)
):
	
	if current_user.role != "admin":
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="Admin access required"
		)

	return current_user
