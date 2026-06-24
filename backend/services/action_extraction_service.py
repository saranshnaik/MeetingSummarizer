# Summary -> Action Items

from pathlib import Path

from config.settings import settings
from integrations.ollama_client import call_llm
from llms.prompt_manager import PromptManager
from observability.logger import logger
from schemas.action_schema import ActionItem, ActionList
from schemas.meeting_schema import Summary
from utils.file_writer import write_to_file


class ActionExtractionService:


    def extract_actions(
        self,
        summary: Summary,
    ) -> list[ActionItem]:
        
        try:

            template = PromptManager.load_prompt(
                "action_extraction_user_prompt"
            )

            user_prompt = template.format(
                summary=summary.text
            )
            
            system_prompt = PromptManager.load_prompt(
                "action_extraction_prompt"
            )

            response = call_llm(
                system_prompt=system_prompt, 
                user_prompt=user_prompt,
                schema_model=ActionList
            )
            
            actions = response.actions

            for action in actions:
                write_to_file(Path(settings.DATA_PATH_TEMP) / "temp_actions.txt", action)

            logger.info(f"Finished action extraction ({len(actions)} actions extracted)")

            return actions
        
        except Exception as e:
            logger.exception(f"Failed to extract actions: {str(e)}")
            raise e
