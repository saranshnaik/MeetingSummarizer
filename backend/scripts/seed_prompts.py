from db.models.prompt_model import PromptVersion
from db.session import SessionLocal

from llms.prompts.action_extraction_prompt import ACTION_EXTRACTION_PROMPT
from llms.prompts.chunk_summary_prompt import CHUNK_SUMMARY_PROMPT
from llms.prompts.execution_prompt import EXECUTION_PROMPT
from llms.prompts.final_summary_prompt import FINAL_SUMMARY_PROMPT
from llms.prompts.planner_prompt import PLANNER_PROMPT
from llms.prompts.reflection_prompt import REFLECTION_PROMPT
from llms.prompts.validation_prompt import VALIDATION_PROMPT
from llms.prompts.user.action_extraction_user_prompt import ACTION_EXTRACTION_USER_PROMPT
from llms.prompts.user.chunk_summary_user_prompt import CHUNK_SUMMARY_USER_PROMPT
from llms.prompts.user.execution_user_prompt import EXECUTION_USER_PROMPT
from llms.prompts.user.final_summary_user_prompt import FINAL_SUMMARY_USER_PROMPT
from llms.prompts.user.planner_user_prompt import PLANNER_USER_PROMPT
from llms.prompts.user.reflection_user_prompt import REFLECTION_USER_PROMPT
from llms.prompts.user.validation_user_prompt import VALIDATION_USER_PROMPT


def seed_prompts():
    db = SessionLocal()

    try:
        prompts = [
            ("action_extraction_prompt", ACTION_EXTRACTION_PROMPT),
            ("chunk_summary_prompt", CHUNK_SUMMARY_PROMPT),
            ("execution_prompt", EXECUTION_PROMPT),
            ("final_summary_prompt", FINAL_SUMMARY_PROMPT),
            ("planner_prompt", PLANNER_PROMPT),
            ("reflection_prompt", REFLECTION_PROMPT),
            ("validation_prompt", VALIDATION_PROMPT),
            ("action_extraction_prompt", ACTION_EXTRACTION_USER_PROMPT),
            ("chunk_summary_prompt", CHUNK_SUMMARY_USER_PROMPT),
            ("execution_prompt", EXECUTION_USER_PROMPT),
            ("final_summary_prompt", FINAL_SUMMARY_USER_PROMPT),
            ("planner_prompt", PLANNER_USER_PROMPT),
            ("reflection_prompt", REFLECTION_USER_PROMPT),
            ("validation_prompt", VALIDATION_USER_PROMPT),
        ]

        for name, content in prompts:
            existing = (
                db.query(PromptVersion)
                .filter(
                    PromptVersion.prompt_name == name,
                    PromptVersion.version == 1,
                )
                .first()
            )

            if existing:
                continue

            db.add(
                PromptVersion(
                    prompt_name=name,
                    version=1,
                    content=content,
                    is_active=True,
                    created_by="system",
                )
            )

        db.commit()
        print("Prompts seeded")

    finally:
        db.close()
