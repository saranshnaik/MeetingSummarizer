# Cloud / local Ollama call

import instructor
from openai import OpenAI
from pydantic import BaseModel
from typing import Any

from config.settings import settings
from observability.logger import logger
from observability.tracer import Tracer

"""
MODELS:
 - gemma4:31b:cloud -
 - qwen3-coder:3b or qwen2.5-coder:3b --- best for coding
 - deepseek-r1:1.5b or deepseek-r1:3b --- best for complex logic and maths
 - llama3.1:8b --- slower
 - llama3.2:3b --- best general
 - gemma:2b --- fastest local
OLLAMA CLOUD CURRENTLY DOES NOT SUPPORT STRUCTURED OUTPUTS
"""


cloud_client = instructor.from_openai(
    OpenAI(
        base_url=f"{settings.OLLAMA_CLOUD_URL}/v1",
        api_key=settings.OLLAMA_API_KEY,
    ),
    mode=instructor.Mode.JSON,
)

local_client = instructor.from_openai(
    OpenAI(
        base_url=f"{settings.OLLAMA_LOCAL_URL}/v1",
        api_key="ollama",
    ),
    mode=instructor.Mode.JSON,
)


def _is_cloud_limit_error(error: Exception) -> bool:

    error_text = str(error).lower()

    limit_keywords = [
        "quota",
        "rate limit",
        "too many requests",
        "429",
        "capacity",
        "payment required",
        "credits"
    ]

    return any(
        keyword in error_text
        for keyword in limit_keywords
    )


def _chat(
        client: Any,
        model: str,
        system_prompt: str,
        user_prompt: str,
        temperature: float,
        max_tokens: int,
        schema_model: type[BaseModel] | None = None
) -> Any:
    
    response_format = (
        schema_model
        if schema_model
        else None    
    )
    
    try:
        response = client.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
            stream=False,
            # options={
            #     "temperature": temperature,
            #     "num_predict": max_tokens
            # },
            response_model=response_format,
            max_retries=3,
            temperature=temperature
        )

        return response
    
    except Exception as e:
        logger.exception(f"Failed ollama call: {str(e)}")
        # raise e


def call_llm(
    system_prompt: str,
    user_prompt: str,
    model: str = settings.OLLAMA_CLOUD_MODEL,
    local_model: str = settings.OLLAMA_LOCAL_MODEL,
    temperature: float = 0,
    max_tokens: int = 10000,
    schema_model: type[BaseModel] | None = None
):
    
    try:
        
        with Tracer.span(f"cloud_ollama_call (model={model})"):
            
            return _chat(
                client=cloud_client,
                model=model,
                system_prompt=system_prompt,
                user_prompt=user_prompt,
                temperature=temperature,
                max_tokens=max_tokens,
                schema_model=schema_model
            )

    except Exception as cloud_error:
        
        logger.exception(f"Failed cloud Ollama call: {str(cloud_error)}")
        
        if _is_cloud_limit_error(cloud_error):

            try:

                with Tracer.span(f"local_ollama_call (model={local_model})"):

                    return _chat(
                        client=local_client,
                        model=local_model,
                        system_prompt=system_prompt,
                        user_prompt=user_prompt,
                        temperature=temperature,
                        max_tokens=max_tokens,
                        schema_model=schema_model
                    )

            except Exception as local_error:
                logger.exception(f"Falied local Ollama call: {str(local_error)}")
                # raise local_error

        else:
            logger.exception(f"Failed Cloud Ollama call: {str(cloud_error)}")
            # raise cloud_error
