# Track pipelines

import time
import uuid
from contextlib import contextmanager

from colorama import init  #Fore, Style

from observability.logger import logger

init(autoreset=True)


class Tracer:

    @staticmethod
    @contextmanager
    def span(name: str):
        
        trace_id = str(uuid.uuid4())[:8]

        start_time = time.time()

        logger.info(
            # f"{Fore.CYAN}[TRACE {trace_id}] START: {name}{Style.RESET_ALL}"
            f"[TRACE {trace_id}] START: {name}"
        )

        try:

            yield trace_id

            duration = round(time.time() - start_time, 2)

            logger.info(
                # f"{Fore.GREEN}[TRACE {trace_id}] END: {name}{Style.RESET_ALL} ({duration}s)"
                f"[TRACE {trace_id}] END: {name} ({duration}s)"
            )
        except Exception as e:

            duration = round(time.time() - start_time, 2)

            logger.error(
                # f"{Fore.RED}[TRACE {trace_id}] FAILED: {name}{Style.RESET_ALL} ({duration}s)"
                f"[TRACE {trace_id}] FAILED: {name} ({duration}s)"
            )            
            raise e
