# Test any service

from services.action_extraction_service import ActionExtractionService	# extract_actions(summary: Summary) -> list[ActionItem]
from services.auth_service import AuthService	                        # FUNCTIONS: register(db: Session, payload: RegisterRequest), login(db: Session, email: str, password: str) ; OUTPUT (both): (dict)
from services.downloader_service import DownloaderService	            # download(source_url: str) -> str
from services.prompt_service import PromptService	                    # FUNCTIONS: 
                                                                        #   get_active_prompt(db: Session, prompt_name: str) -> PromptVersion
                                                                        #   get_prompt_vesions(db: Session, prompt_name: str) -> List[PromptVersion]
                                                                        #   rollback_prompt(db: Session, prompt_name: str, version: int) -> PromptVersion
                                                                        #   get_prompt_names(db: Session, prompt_type: str) -> list[Any]
from services.status_service import StatusService	                    # FUNCTIONS: emit_sync(user_id: str, event: str, message: str, action_id: str) -> None, emit(user_id: str, event: str, message: str, action_id: str) -> None
from services.summarization_service import SummarizationService	        # summarize(transcript: Transcript) -> Summary
from services.transcription_service import TranscriptionService	        # transcribe(file_path: str) -> Transcript
from services.validation_service import ValidationService	            # FUNCTIONS:
                                                                        #   validate_action_extraction(summary: Summary, extracted_actions: list[ActionItem]) -> ValidationResult
                                                                        #   validate_action(action: ActionItem) -> ValidationResult
                                                                        #   validate_execution(plan: ToolPlan, execution_result: ExecutionResult) -> ValidationResult
                                                                        #   validate_planner(action: ActionItem, planner_output: ToolPlan) -> ValidationResult
                                                                        #   validate_reflection(action: ActionItem, plan: ToolPlan, execution_result: ExecutionResult, reflection_result: ReflectionResult) -> ValidationResult
                                                                        #   validate_summary(transcript: Transcript, summary: Summary) -> ValidationResult
from services.websocket_manager import WebSocketManager                 # FUNCTIONS:
                                                                        #   connect(user_id: str, websocket: WebSocket) -> None
																		#   disconnect(user_id: str, websocket: WebSocket) -> None
																		#   send_to_user(user_id: str, payload: dict) -> None
															


input = "Specific service input"

service = ActionExtractionService() # service to be tested

output = service.function(**input)

print(repr(output))
