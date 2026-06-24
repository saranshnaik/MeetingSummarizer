#Global, centralized settings

from pathlib import Path
from pydantic import ConfigDict
from pydantic_settings import BaseSettings

ROOT = Path(__file__).resolve().parents[2]

class Settings(BaseSettings):
    
    model_config = ConfigDict(
        env_file=ROOT/".env",
        case_sensitive=True
    )
    
    ADMIN_SEED_EMAIL: str
    ADMIN_SEED_PASSWORD: str

    HF_TOKEN: str

    DATABASE_URL: str
    
    DATA_PATH_PROCESSED: str
    DATA_PATH_RAW: str
    DATA_PATH_TEMP: str
    
    JWT_ALGORITHM: str
    JWT_EXPIRE_MINUTES: int
    JWT_SECRET_KEY: str
    
    LOGS_PATH: str

    MAX_RETRIES: int

    OLLAMA_API_KEY: str
    
    OLLAMA_CLOUD_URL: str
    OLLAMA_LOCAL_URL: str

    OLLAMA_CLOUD_MODEL: str
    OLLAMA_LOCAL_MODEL: str

    VALIDATION_THRESHOLD: float


settings = Settings()
