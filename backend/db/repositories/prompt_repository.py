# All prompts repo

from sqlalchemy.orm import Session

from db.models.prompt_model import PromptVersion


class PromptRepository:


	@staticmethod
	def get_active_prompt(
		db: Session,
		prompt_name: str
	):
		
		return (
			db.query(PromptVersion)
			.filter(
				PromptVersion.prompt_name == prompt_name,
				PromptVersion.is_active
			)
			.first()
		)
	

	@staticmethod
	def get_prompt_versions(
		db: Session,
		prompt_name: str
	):
		
		return (
			db.query(PromptVersion)
			.filter(
				PromptVersion.prompt_name == prompt_name,
			)
			.order_by(
				PromptVersion.version.desc()
			)
			.all()
		)
	

	@staticmethod
	def get_prompt_by_version(
		db: Session,
		prompt_name: str,
		version: int
	):
		
		return (
			db.query(PromptVersion)
			.filter(
				PromptVersion.prompt_name == prompt_name,
				PromptVersion.version == version
			)
			.first()
		)
	

	@staticmethod
	def get_latest_version_number(
		db: Session,
		prompt_name: str
	):
		
		latest = (
			db.query(PromptVersion)
			.filter(
				PromptVersion.prompt_name == prompt_name,
			)
			.order_by(
				PromptVersion.version.desc()
			)
			.first()
		)

		if not latest:
			return 0
		
		return latest.version
	

	@staticmethod
	def deactivate_all_versions(
		db: Session,
		prompt_name: str
	):
		
		(
			db.query(PromptVersion)
			.filter(
				PromptVersion.prompt_name == prompt_name,
			)
			.update({
				PromptVersion.is_active: False
			})
		)

		db.commit()
	

	@staticmethod
	def create_prompt(
		db: Session,
		prompt: PromptVersion
	):
		
		db.add(prompt)

		db.commit()

		db.refresh(prompt)

		return prompt


	@staticmethod
	def get_prompt_names(
		db: Session,
		prompt_type: str | None = None
	):

		query = db.query(PromptVersion.prompt_name)

		if prompt_type:
			query = query.filter(
				PromptVersion.prompt_type == prompt_type
			)		

		rows = (
			query
			.distinct()
			.order_by(PromptVersion.prompt_name.asc())
			.all()
		)

		return [row[0] for row in rows]
