# Prompt management service

from fastapi import HTTPException
from sqlalchemy.orm import Session

from db.models.prompt_model import PromptVersion
from db.repositories.prompt_repository import PromptRepository
from schemas.prompt_schema import PromptCreate


class PromptService:


	@staticmethod
	def create_prompt(
		db: Session,
		payload: PromptCreate
	):
		
		latest_version = (
			PromptRepository.get_latest_version_number(
				db,
				payload.prompt_name
			)
		)

		new_version = latest_version + 1

		PromptRepository.deactivate_all_versions(
			db,
			payload.prompt_name
		)

		prompt = PromptVersion(

			prompt_name = payload.prompt_name,

			prompt_type = payload.prompt_type,

			version = new_version,

			content = payload.content,

			is_active = True,

			created_by = payload.created_by
		)

		return PromptRepository.create_prompt(
			db,
			prompt
		)


	@staticmethod
	def get_active_prompt(
		db: Session,
		prompt_name: str
	):
		
		prompt = PromptRepository.get_active_prompt(
			db,
			prompt_name
		)

		if not prompt:
			raise HTTPException(
				status_code=404,
				detail="Prompt not found"
			)
		
		return prompt
	

	@staticmethod
	def get_prompt_vesions(
		db: Session,
		prompt_name: str
	):
		
		return PromptRepository.get_prompt_versions(
			db,
			prompt_name
		)
	

	@staticmethod
	def rollback_prompt(
		db: Session,
		prompt_name: str,
		version: int
	): 
		
		target_prompt = (
			PromptRepository.get_prompt_by_version(
				db,
				prompt_name,
				version
			)
		)

		if not target_prompt:
			raise HTTPException(
				status_code=404,
				detail="Version not found"
			)
		
		current_active = PromptRepository.get_active_prompt(
			db,
			prompt_name
		)

		if current_active:
			current_active.is_active = False
		
		target_prompt.is_active = True

		db.commit()

		db.refresh(target_prompt)

		return target_prompt


	@staticmethod
	def get_prompt_names(
		db: Session,
		prompt_type: str | None = None
	):
		
		return PromptRepository.get_prompt_names(
			db,
			prompt_type
		)
