# Data -> Whisper -> Text Output

from observability.logger import logger
from observability.tracer import Tracer
from schemas.meeting_schema import Transcript
from services.downloader_service import DownloaderService
from services.transcription_service import TranscriptionService


class TranscriptionPipeline:

    def __init__(self):
        
        self.downloader_service = DownloaderService()
        self.transcription_service = TranscriptionService()

    def run(
        self,
        source_url: str = None,
        file_path: str = None
    ) -> Transcript:
            
        with Tracer.span("transcription_pipeline"):
            
            if source_url:
                file_path = self.downloader_service.download(source_url)

            if not file_path:
                logger.error("Failed transcription: file_path is null")
                return Transcript(
                    text=" "
                )

            transcript = self.transcription_service.transcribe(file_path)

        return Transcript(
            text=transcript.text,
            language=transcript.language,
            duration_seconds=transcript.duration_seconds,
            file_path=file_path
        )
