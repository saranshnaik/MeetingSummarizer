# Meeting routes

import os
from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status

from auth.dependencies import get_current_user
from config.settings import settings
from observability.logger import logger
from pipelines.meeting_pipeline import MeetingPipeline
from schemas.api_schema import APIResponse, ErrorDetail
from schemas.meeting_schema import MeetingInput, MeetingOutput

router = APIRouter()


meeting_pipeline = MeetingPipeline()


@router.post(
    "/meeting/process",
    response_model=APIResponse[MeetingOutput],
    status_code=status.HTTP_200_OK 
)
def process_meeting(
    file: Annotated[UploadFile | None, File()] = None,
    source_url: Annotated[str | None, Form()] = None,
    current_user = Depends(get_current_user)
):

    if not file and not source_url:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorDetail(
                code="INVALID_INPUT",
                message="Provide either file or source_url"
            ).model_dump()
        )

    logger.info("Received meeting processing request.")
    
    os.makedirs(Path(settings.DATA_PATH_RAW), exist_ok=True)

    uploaded_file_path = None
    downloaded_file_path = None
    
    try:
        if file:
            uploaded_file_path = Path(settings.DATA_PATH_RAW) / f"{file.filename}"
            contents = file.file.read()

            with open(uploaded_file_path, "wb") as f:
                f.write(contents)

                logger.info(f"Uploaded file saved to: {uploaded_file_path}")

        payload = MeetingInput(
            source_url=source_url,
            file_path=str(uploaded_file_path)
        )

        parsed_url = str(payload.source_url) if payload.source_url else None
        parsed_file_path = payload.file_path if payload.file_path else None
        
        result = meeting_pipeline.run(
            user_id=str(current_user.id),
            source_url=parsed_url,
            file_path=parsed_file_path
        )

        downloaded_file_path = result.transcript.file_path

        return APIResponse(
            success=True,
            message="Meeting processed successfully.",
            data=result
        )

    except Exception as e:
        logger.exception(f"Failed to process meeting: {str(e)}")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorDetail(
                code="MEETING_PROCESSING_FAILED",
                message=f"{str(e)}"
            ).model_dump()
        ) from e
    
    finally:
        if uploaded_file_path and os.path.exists(uploaded_file_path):
            os.remove(uploaded_file_path)
            logger.info(f"Removed uploaded file: {uploaded_file_path}")

        if downloaded_file_path and os.path.exists(downloaded_file_path):
            os.remove(downloaded_file_path)
            logger.info(f"Removed downloaded file: {downloaded_file_path}")
