# Database user model

from datetime import UTC, datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String

from db.session import Base


class User(Base):

	__tablename__ = "users"

	created_at = Column(
		DateTime(timezone=True),
		default=lambda: datetime.now(UTC)
	)

	full_name = Column(
		String,
		nullable=False
	)

	hashed_password = Column(
		String,
		nullable=False
	)

	id = Column(
		Integer,
		primary_key=True,
		index=True
	)

	email = Column(
		String,
		unique=True,
		index=True,
		nullable=False
	)

	is_active = Column(
		Boolean,
		default=True
	)

	role = Column(
		String,
		default="user",
		nullable=False
	)
