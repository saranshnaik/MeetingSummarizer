# Transcription client for Whisper

from faster_whisper import WhisperModel

from config.settings import settings
from observability.logger import logger
from observability.tracer import Tracer
from schemas.meeting_schema import Transcript


class WhisperClient:


    def __init__(self):        
        self.model = None


    def load_model(self):
        if self.model is None:
            self.model = WhisperModel(
                "base",
                device="cpu",
                compute_type="int8",
                use_auth_token=settings.HF_TOKEN
            )

            
    def transcribe_audio(
        self, 
        file_path: str,
    ) -> Transcript:
        
        logger.info(f"Started transcription for file: {file_path}")

        with Tracer.span("transcription"):
            self.load_model()
            
            segments, info = self.model.transcribe(file_path)
    
            full_text = " ".join(
                segment.text for segment in segments
            )
    
        logger.info(f"Finished transcription. transcript_duration: {round(float(info.duration), 2)}")   

        return Transcript(
            text=str(full_text.strip()),
            language=str(info.language),
            duration_seconds=round(float(info.duration), 2),
            file_path=file_path
        )
