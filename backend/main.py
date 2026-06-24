# To run, use `uvicorn main:app --reload`

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import even if unused: importing them registers them into SQLAlchemy metadata
from db.models.prompt_model import PromptVersion
from db.models.user_model import User
from db.session import Base, engine
from routes.action_routes import router as action_router
from routes.auth_routes import router as auth_router
from routes.health_routes import router as health_router
from routes.logs_routes import router as logs_router
from routes.meeting_routes import router as meeting_router
from routes.prompt_routes import router as prompt_router
from routes.websocket_routes import router as websocket_router
from scripts.run_scripts import run_seeds

with open("logs/app.log", 'a') as logs:
    logs.write("\n\n\n" + "=" * 100)
    logs.write("\nMEETING SUMMARIZER: Backend Logs\n")
    logs.write("=" * 100 + "\n")


Base.metadata.create_all(bind=engine)
run_seeds()


app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(action_router)
app.include_router(auth_router)
app.include_router(health_router)
app.include_router(logs_router)
app.include_router(meeting_router)
app.include_router(prompt_router)
app.include_router(websocket_router)
