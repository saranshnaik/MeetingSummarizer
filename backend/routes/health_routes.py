# Used for monitoring and Docker

from fastapi import APIRouter, status

from observability.logger import logger
from schemas.api_schema import APIResponse

router = APIRouter()


@router.get(
    "/health",
    response_model=APIResponse,
    status_code=status.HTTP_200_OK
)
def health_check():

    logger.info("Called health check endpoint.")
    
    return APIResponse(
        success=True,
        message="Server is healthy and running.",
        data=None
    )
