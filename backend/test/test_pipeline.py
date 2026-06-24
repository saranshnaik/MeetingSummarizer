# Test any pipeline

from pipelines.action_extraction_pipeline import ActionExtractionPipeline	# INPUT: (summary: str) ; OUTPUT: (list[ActionItem])
from pipelines.execution_pipeline import ExecutionPipeline					# INPUT: (plan: ToolPlan) ; OUTPUT: (ExecutionResult)
from pipelines.meeting_pipeline import MeetingPipeline						# INPUT: (user_id: str, source_url: str, file_path: str) ; OUTPUT: (MeetingOutput)
from pipelines.orchestration_pipeline import OrchestrationPipeline			# INPUT: (action: ActionItem, user_id: str) ; OUTPUT: (OrchestrationResult)
from pipelines.planning_pipeline import PlanningPipeline					# INPUT: (action: ActionItem) ; OUTPUT: (ToolPlan)
from pipelines.reflection_pipeline import ReflectionPipeline				# INPUT: (action: ActionItem, plan: ToolPlan, execution_result: ExecutionResult) ; OUTPUT: (ReflectionResult)
from pipelines.summarization_pipeline import SummarizationPipeline			# INPUT: (transcript: Transcript) ; OUTPUT: (Summary)
from pipelines.transcription_pipeline import TranscriptionPipeline			# INPUT: (source_url: str, file_path: str) ; OUTPUT: (Transcript)


input = "Specific pipeline input"

pipeline = ActionExtractionPipeline() # Pipeline to be tested

output = pipeline.run(**input)

print(repr(output))
