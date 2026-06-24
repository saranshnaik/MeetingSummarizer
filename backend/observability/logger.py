# To generate structured logs

import logging
import sys
from logging.handlers import RotatingFileHandler
from pathlib import Path

from config.settings import settings

LOG_FILE = Path(settings.LOGS_PATH) / "app.log"


def setup_logger(
    name: str = "meeting_summarizer: "
) -> logging.Logger:

    logger = logging.getLogger(name)

    if logger.handlers:
        return logger
    
    logger.setLevel(logging.INFO)


    console_handler = logging.StreamHandler(sys.stdout)

    console_format = logging.Formatter(
        "[%(asctime)s] [%(levelname)s] [%(message)s]"
    )

    console_handler.setFormatter(console_format)


    file_handler = RotatingFileHandler(
        LOG_FILE,
        maxBytes=5 * 1024 * 1024,
        backupCount=3,
        encoding="utf-8"
    )

    file_format = logging.Formatter(
        "%(asctime)s | "
        "%(levelname)s | "
        "%(name)s"
        "%(filename)s:%(lineno)d | "
        "%(message)s"
    )

    file_handler.setFormatter(file_format)

    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger

logger = setup_logger()
