# Agent template

from pydantic import BaseModel

from integrations.ollama_client import call_llm


class BaseAgent:


    def __init__(self, model: str):  
        self.model = model


    def generate(
            self,
            system_prompt: str,
            user_prompt: str,
            temperature: float = 0,
            max_tokens: int = 10000,
            schema_model: type[BaseModel] | None = None
    ):
        
        response = call_llm(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            model=self.model,
            temperature=temperature,
            max_tokens=max_tokens,
            schema_model=schema_model
        )
        
        return response
