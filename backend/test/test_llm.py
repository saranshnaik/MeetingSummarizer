# Test llms

from integrations.ollama_client import call_llm


USER_PROMPT = "Test user prompt"

SYSTEM_PROMPT = "Test system prompt"

response = call_llm(
	system_prompt=SYSTEM_PROMPT,
	user_prompt=USER_PROMPT,
)

print(repr(response))
