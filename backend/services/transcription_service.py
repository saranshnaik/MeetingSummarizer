# Audio -> Text

import textwrap
from pathlib import Path

from config.settings import settings
from integrations.whisper_client import WhisperClient
from schemas.meeting_schema import Transcript
from utils.file_writer import write_to_file


class TranscriptionService:
    

    def __init__(self):

        self.whisper_client = WhisperClient()
    
    
    def transcribe(
        self,
        file_path: str
    ) -> Transcript:
        
        result = self.whisper_client.transcribe_audio(file_path=file_path)

        wrapped = textwrap.fill(result.text, width=125)
        write_to_file(Path(settings.DATA_PATH_TEMP) / "temp_transcript.txt", wrapped)

        return Transcript(
            text=result.text,
            language=result.language,
            duration_seconds=result.duration_seconds,
            file_path=file_path
        )
