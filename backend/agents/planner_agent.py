# Tool planner agent

from pathlib import Path

from agents.base_agent import BaseAgent
from config.settings import settings
from llms.prompt_manager import PromptManager
from observability.logger import logger
from observability.tracer import Tracer
from schemas.action_schema import ActionItem
from schemas.planner_schema import ToolPlan
from utils.file_writer import write_to_file


class PlannerAgent(BaseAgent):


    def __init__(
        self, 
        model: str = settings.OLLAMA_CLOUD_MODEL
    ):
        
        super().__init__(model=model)


    def plan(
        self, 
        action: ActionItem
    ) -> ToolPlan:

        try:
        
            with Tracer.span("tool_planning"):
                template = PromptManager.load_prompt("planner_user_prompt")

                user_prompt = template.format(
                    id=action.id,
                    title=action.title,
                    description=action.description,
                    assignee=action.assignee,
                    type=action.type,
                    due_date=action.due_date,
                    start_time=action.start_time,
                    end_time=action.end_time,
                    priority=action.priority,
                    completed=action.completed
                )  
                
                system_prompt = PromptManager.load_prompt("planner_prompt")
                
                response = self.generate(
                    system_prompt=system_prompt,
                    user_prompt=user_prompt,
                    schema_model=ToolPlan
                )

                write_to_file(Path(settings.DATA_PATH_TEMP) / "temp_planner.txt", response)
                
            return response
        
        except Exception as e:
            logger.exception(f"Failed to create plan: {str(e)}")
