# Text -> Summary

from pathlib import Path

from config.settings import settings
from integrations.ollama_client import call_llm
from llms.prompt_manager import PromptManager
from observability.logger import logger
from schemas.meeting_schema import Summary
from utils.chunking import chunk_text
from utils.file_writer import write_to_file


class SummarizationService:


    def summarize(
        self,
        transcript: str,
    ) -> Summary:
        
        try:

            chunks = chunk_text(transcript)

            partial_summaries = []


            for chunk in chunks:
                template = PromptManager.load_prompt("chunk_summary_user_prompt")
                
                user_prompt = template.format(chunk=chunk)

                system_prompt = PromptManager.load_prompt("chunk_summary_prompt")

                response = call_llm(
                    system_prompt=system_prompt, 
                    user_prompt=user_prompt,
                    schema_model=Summary
                )

                partial_summaries.append(response.text)

            combined_summary = "\n\n".join(partial_summaries)
        
            template = PromptManager.load_prompt("final_summary_user_prompt")

            final_user_prompt = template.format(combined_summary=combined_summary)
            
            final_system_prompt = PromptManager.load_prompt("final_summary_prompt")

            final_response = call_llm(
                system_prompt=final_system_prompt, 
                user_prompt=final_user_prompt,
                schema_model=Summary
            )

            write_to_file(Path(settings.DATA_PATH_TEMP) / "temp_summary.txt", final_response.text)

            return final_response

        except Exception as e:
            logger.exception(f"Failed summarization: {str(e)}")
            raise e
