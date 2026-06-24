#Prompt routes

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import require_admin
from db.session import get_db
from observability.logger import logger
from schemas.prompt_schema import PromptCreate
from services.prompt_service import PromptService

router = APIRouter(
	prefix="/admin/prompts",
	tags=["Prompts"]
)


@router.post("/")
def create_prompt(
	payload: PromptCreate,
	db: Session = Depends(get_db),
	current_admin = Depends(require_admin)
):
	
	logger.info(f"Received prompt creation request: {payload.prompt_name}")
	
	return PromptService.create_prompt(
		db,
		payload
	)
	

@router.get("/names")
def get_prompt_names(
	prompt_type: str | None,
	db: Session = Depends(get_db),
	current_admin = Depends(require_admin)
):

	logger.info(f"Received prompt names request. type={prompt_type}")

	return PromptService.get_prompt_names(
		db,
		prompt_type
	)


@router.get("/{prompt_name}/latest")
def get_latest_prompt(
	prompt_name: str,
	db: Session = Depends(get_db),
	current_admin = Depends(require_admin)
):
	
	logger.info(f"Received prompt accession request: {prompt_name}")

	return PromptService.get_active_prompt(
		db,
		prompt_name
	)
	

@router.get("/{prompt_name}")
def get_prompt_versions(
	prompt_name: str,
	db: Session = Depends(get_db),
	current_admin = Depends(require_admin)
):
	
	logger.info(f"Received prompt versions accession request: {prompt_name}")

	return PromptService.get_prompt_vesions(
		db,
		prompt_name
	)
	

@router.post("/{prompt_name}/rollback/{version}")
def rollback_prompt(
	prompt_name: str,
	version: int,
	db: Session = Depends(get_db),
	current_admin = Depends(require_admin)
):
	
	logger.info(f"Received prompt rollback request: {prompt_name}, v{version}")

	return PromptService.rollback_prompt(
		db,
		prompt_name,
		version
	)
