# Database prompt model

from datetime import UTC, datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text

from db.session import Base


class PromptVersion(Base):

	__tablename__ = "prompt_versions"

	content = Column(
		Text,
		nullable=False 
	)

	created_at = Column(
		DateTime(timezone=True),
		default=lambda: datetime.now(UTC),
		nullable=False 
	)

	created_by = Column(
		String,
		nullable=False
	)

	id = Column(
		Integer,
		primary_key=True,
		index=True
	)

	is_active = Column(
		Boolean,
		default=False,
		nullable=False
	)

	prompt_name = Column(
		String,
		index=True,
		nullable=False
	)

	prompt_type = Column(
		String,
		# index=True,
		nullable=False
	)

	version = Column(
		Integer,
		nullable=False
	)
