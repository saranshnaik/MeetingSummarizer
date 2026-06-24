# Central evaluation template

from integrations.ollama_client import call_llm
from llms.prompt_manager import PromptManager
from schemas.validation_schema import ValidationResult


class Judge:


	@staticmethod
	def evaluate(
		task_name: str,
		source_context: str,
		generated_output: str,
	) -> ValidationResult:
	
		template = PromptManager.load_prompt("validation_user_prompt")

		user_prompt = template.format(
			task_name=task_name,
			source_context=source_context,
			generated_output=generated_output
		)

		system_prompt = PromptManager.load_prompt("validation_prompt")

		return call_llm(
			system_prompt=system_prompt,
			user_prompt=user_prompt,
			temperature=0,
			schema_model=ValidationResult
		)
