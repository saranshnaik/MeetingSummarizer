# Log routes

import re
from pathlib import Path

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import require_admin
from config.settings import settings
from db.session import get_db

LOG_FILE = Path(settings.LOGS_PATH) / "app.log"


router = APIRouter()

RUN_MARKER = (
	"====================================================================================================\n"
    "MEETING SUMMARIZER: Backend Logs"
)

ANSI_ESCAPE = re.compile(r"\x1B\[[0-?]*[ -/]*[@-~]")


@router.get("/admin/logs/latest")
def get_latest_logs(
	db: Session = Depends(get_db),
	current_admin = Depends(require_admin)
):
	with open(LOG_FILE, "r", encoding="utf-8", errors="ignore") as f:
		content = f.read()

	clean_content = ANSI_ESCAPE.sub("", content)

	idx = clean_content.rfind(RUN_MARKER)

	if idx == -1:
		latest_run = clean_content
	else:
		latest_run = clean_content[idx:]

	parsed_logs = []

	for line in latest_run.splitlines():
		parts = line.split(" | ")

		if len(parts) >= 4:
			parsed_logs.append({
				"timestamp": parts[0],
				"level": parts[1],
				"source": parts[2].replace("meeting_summarizer: ", "", 1),
				"message": " | ".join(parts[3:])
			})

	return {
			"logs": parsed_logs
		}
