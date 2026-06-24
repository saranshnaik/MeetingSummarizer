# JWT handler

from datetime import UTC, datetime, timedelta

from jose import jwt

from config.settings import settings

SECRET_KEY = settings.JWT_SECRET_KEY
ALGORITHM = settings.JWT_ALGORITHM
EXPIRE_MINUTES = settings.JWT_EXPIRE_MINUTES


def create_access_token(
	data: dict[str, str | int | bool],
	expires_minutes: int = EXPIRE_MINUTES
) -> str:
	
	to_encode = data.copy()

	expire = datetime.now(UTC) + timedelta(
		minutes=expires_minutes
	)
	
	to_encode.update({
		"exp": expire
	})

	return jwt.encode(
		to_encode,
		SECRET_KEY,
		algorithm=ALGORITHM
	)


def decode_access_token(
	token: str
) -> dict[str, str | int | bool]:
	
	return jwt.decode(
		token,
		SECRET_KEY,
		algorithms=[ALGORITHM]
	)
