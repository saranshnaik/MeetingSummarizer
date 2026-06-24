from db.session import engine, Base

from db.models.prompt_model import PromptVersion

Base.metadata.create_all(bind=engine)

print("Database initialized")