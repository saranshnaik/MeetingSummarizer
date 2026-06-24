# Loads prompts from DB

from db.repositories.prompt_repository import PromptRepository
from db.session import SessionLocal
from observability.tracer import logger


class PromptManager:


    @staticmethod
    def load_prompt(
        prompt_name: str,
    ) -> str:
        
        db= SessionLocal()

        try:

            prompt = PromptRepository.get_active_prompt(
                db,
                prompt_name
            )

            if not prompt:
                raise ValueError(f"No active prompt found for: {prompt_name}")
            
            return prompt.content
        except Exception as e:

            logger.exception(f"Failed tol load prompt: {str(e)}")

        finally:
            db.close()
