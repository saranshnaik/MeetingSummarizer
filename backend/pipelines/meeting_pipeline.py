# Main pipeline: Audio/Video -> Transcription -> Summarization -> Action Item Extraction -> Store Results

from observability.tracer import Tracer
from pipelines.action_extraction_pipeline import ActionExtractionPipeline
from pipelines.summarization_pipeline import SummarizationPipeline
from pipelines.transcription_pipeline import TranscriptionPipeline
from schemas.meeting_schema import MeetingOutput
from schemas.websocket_events import (
    ACTION_EXTRACTION_COMPLETED,
    ACTION_EXTRACTION_STARTED,
    PIPELINE_COMPLETED,
    SUMMARY_COMPLETED,
    SUMMARY_STARTED,
    TRANSCRIPTION_COMPLETED,
    TRANSCRIPTION_STARTED,
)
from services.status_service import status_service


class MeetingPipeline:

    def __init__(self):
        
        self.transcriber = TranscriptionPipeline()
        self.summarizer = SummarizationPipeline()
        self.extractor = ActionExtractionPipeline()

    def run(
        self,
        user_id: str,
        source_url: str = None,
        file_path: str = None
    ) -> MeetingOutput:
        
        with Tracer.span("meeting_pipeline"):

            status_service.emit_sync(
                user_id,
                TRANSCRIPTION_STARTED,
                "Generating transcript..."
            )
            
            transcript = self.transcriber.run(
                source_url=source_url, 
                file_path=file_path
            )

            status_service.emit_sync(
                user_id,
                TRANSCRIPTION_COMPLETED,
                "Generated transcript"
            )
            
            status_service.emit_sync(
                user_id,
                SUMMARY_STARTED,
                "Generating summary..."
            )

            summary = self.summarizer.run(
                transcript=transcript
            )

            
            status_service.emit_sync(
                user_id,
                SUMMARY_COMPLETED,
                "Generated summary"
            )

            status_service.emit_sync(
                user_id,
                ACTION_EXTRACTION_STARTED,
                "Extracting action items..."
            )

            actions = self.extractor.run(
                summary=summary
            )
            
            status_service.emit_sync(
                user_id,
                ACTION_EXTRACTION_COMPLETED,
                "Extracted action items"
            )

        
        status_service.emit_sync(
            user_id,
            PIPELINE_COMPLETED,
            "Processed meeting"
        )

        return MeetingOutput(
            transcript=transcript,
            summary=summary,
            actions=actions,
        )
