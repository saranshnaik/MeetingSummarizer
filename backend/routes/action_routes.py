# Action routes

from fastapi import APIRouter, Depends, HTTPException, status

from auth.dependencies import get_current_user
from observability.logger import logger
from pipelines.orchestration_pipeline import OrchestrationPipeline
from schemas.action_schema import ActionItem
from schemas.execution_schema import ErrorDetail, ExecutionResponse

router = APIRouter()


@router.post(
        "/action/execute",
        response_model=ExecutionResponse,
        status_code=status.HTTP_200_OK
)
def execute_action(
    action: ActionItem,
    current_user = Depends(get_current_user)
) -> ExecutionResponse:

    logger.info(f"Received action execution request from user={current_user.id}")

    try:
        orchestrator = OrchestrationPipeline()

        result = orchestrator.run(
            action,
            user_id=str(current_user.id)
        )

        execution_result = result.execution_result

        if execution_result.status != "failed" and execution_result.status != "blocked":
            return ExecutionResponse(
                success=True,
                message="Action executed successfully.",
                data=execution_result
            )
        
        else:
            return ExecutionResponse(
                success=False,
                message="Action execution failed.",
                data=execution_result
            )
    
    except Exception as e:
        logger.exception(f"Failed to execute action: {str(e)}")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorDetail(
                code="ACTION_EXECUTION_FAILED",
                message="Failed to execute action."
            ).model_dump()
        ) from e
    
    finally:
        # Remove temp files if any created
        pass
