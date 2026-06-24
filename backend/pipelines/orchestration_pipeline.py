# Coordinate all agents

from pathlib import Path

from config.settings import settings
from observability.logger import logger
from observability.tracer import Tracer
from pipelines.execution_pipeline import ExecutionPipeline
from pipelines.planning_pipeline import PlanningPipeline
from pipelines.reflection_pipeline import ReflectionPipeline
from schemas.action_schema import ActionItem
from schemas.orchestration_schema import OrchestrationResult
from schemas.websocket_events import (
    EXECUTION_COMPLETED,
    EXECUTION_STARTED,
    PIPELINE_COMPLETED,
    PLANNING_COMPLETED,
    PLANNING_STARTED,
    REFLECTION_COMPLETED,
    REFLECTION_STARTED,
)
from services.status_service import status_service
from utils.file_writer import write_to_file


class OrchestrationPipeline:


    def __init__(self):
        
        self.planner = PlanningPipeline()
        self.executor = ExecutionPipeline()
        self.reflector = ReflectionPipeline()


    def run(
        self,
        action: ActionItem,
        user_id: str
    ) -> OrchestrationResult:
        
        planner = PlanningPipeline()
        executor = ExecutionPipeline()
        reflector = ReflectionPipeline()

        with Tracer.span("orchestration_pipeline"):
            for attempt in range(settings.MAX_RETRIES):
                
                status_service.emit_sync(
                    user_id,
                    PLANNING_STARTED,
                    "Generating plan...",
                    action_id=action.id
                )

                plan = planner.run(
                    action=action
                )

                status_service.emit_sync(
                    user_id,
                    PLANNING_COMPLETED,
                    "Generated plan",
                    action_id=action.id
                )

                status_service.emit_sync(
                    user_id,
                    EXECUTION_STARTED,
                    "Executing action...",
                    action_id=action.id
                )
                
                execution_result = executor.run(
                    plan=plan
                )

                status_service.emit_sync(
                    user_id,
                    EXECUTION_COMPLETED,
                    "Executed action",
                    action_id=action.id
                )

                status_service.emit_sync(
                    user_id,
                    REFLECTION_STARTED,
                    "Validating execution...",
                    action_id=action.id
                )

                reflection = reflector.run(
                    action=action,
                    plan=plan,
                    execution_result=execution_result
                )

                status_service.emit_sync(
                    user_id,
                    REFLECTION_COMPLETED,
                    "Validated execution",
                    action_id=action.id
                )

                formatted_result = {
                    "plan": plan.model_dump_json(indent=2),
                    "result": execution_result.model_dump_json(indent=2),
                    "reflection": reflection.model_dump_json(indent=2)
                }

                write_to_file(Path(settings.DATA_PATH_TEMP) / "temp_orchestration.txt", formatted_result)

                if reflection.retry_needed:
                    logger.warning(f"Retry triggered for action={action.title[:20]}... (attempt={attempt+1})")
                
                else:
                    
                    status_service.emit_sync(
                        user_id,
                        PIPELINE_COMPLETED,
                        "Completed action",
                        action_id=action.id
                    )

                    return OrchestrationResult(
                        planner_result=plan,
                        execution_result=execution_result,
                        reflection_result=reflection
                    )
            
            else:
                logger.error("Unable to perform action.")
