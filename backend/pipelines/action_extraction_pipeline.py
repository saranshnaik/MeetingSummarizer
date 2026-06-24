# Summary -> Items (Structured Output)

from pathlib import Path

from config.settings import settings
from observability.logger import logger
from observability.tracer import Tracer
from schemas.action_schema import ActionItem
from schemas.meeting_schema import Summary
from schemas.validation_schema import ValidationError
from services.action_extraction_service import ActionExtractionService
from services.validation_service import ValidationService
from utils.file_writer import write_to_file


class ActionExtractionPipeline:


    def __init__(self):
        self.extractor = ActionExtractionService()
        self.validator = ValidationService()


    def run(
        self,
        summary: Summary
    ) -> list[ActionItem]:
        
        actions = []

        with Tracer.span("action_extraction_pipeline"):
            actions = self._extract_validated_actions(summary)
                        
        return actions
        

    def _extract_validated_actions(
        self,
        summary: Summary
    ) -> list[ActionItem]:
        
        for attempt in range(settings.MAX_RETRIES):
        
            actions = self.extractor.extract_actions(
                summary=summary
            )

            if len(actions) == 0:
                return []

            with Tracer.span("extraction_validation"):
                extraction_validation = (
                    self.validator.validate_action_extraction(
                        summary=summary,
                        extracted_actions=actions
                    )
                )
            
                write_to_file(Path(settings.DATA_PATH_TEMP) / "validations/temp_extraction_validation.txt", extraction_validation)

                if extraction_validation.score < settings.VALIDATION_THRESHOLD:

                    logger.warning(f"Action extraction validation failed (score: ({extraction_validation.score}) "
                            f"Retrying... (attempt={attempt+1})")
                    continue
            
            validated_actions = (
                self._validate_actions(actions)
            )

            if validated_actions:
                return validated_actions
            
            logger.warning("No valid actions found.")

        else:
            raise ValidationError(extraction_validation)
        

    def _validate_actions(
        self,
        actions: list[ActionItem]
    ) -> list[ActionItem]:
            
        accepted_actions = []
        validation_results = []

        for action in actions:
        
            with Tracer.span(f"action_validation: {action.title[:20]}..."):

                validation = (
                    self.validator.validate_action(
                        action=action
                    )
                )

                validation_results.append({
                    "action": action.model_dump(),
                    "validation": validation.model_dump()
                })

                if validation.score >= settings.VALIDATION_THRESHOLD:
                    logger.info(f"Accepted action '{action.title[:20]}...' score: {validation.score}")
                    accepted_actions.append(action)

                else: 
                    logger.info(f"Rejected action '{action.title[:20]}...' score: {validation.score}")

            write_to_file(Path(settings.DATA_PATH_TEMP) / "validations/temp_actions_validation.txt", validation_results)

        return accepted_actions
