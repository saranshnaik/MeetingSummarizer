# Download audio / video from source_url

from pathlib import Path
from uuid import uuid4

import certifi
import yt_dlp

from config.settings import settings
from observability.logger import logger
from observability.tracer import Tracer


class DownloaderService:


    def download(
        self, 
        source_url: str
    ) -> str:
        
        try:

            logger.info(f"Started download for source_url: {source_url}.")
            
            Path(settings.DATA_PATH_RAW).mkdir(parents=True, exist_ok=True)

            file_id = uuid4().hex[:8]

            output_template = (
                Path(settings.DATA_PATH_RAW)
                / f"{file_id}.%(ext)s"
            )

            final_output_path = (
                Path(settings.DATA_PATH_RAW)
                / f"{file_id}.mp3"
            )

            ydl_opts = {
                "format": "bestaudio/best",
                "outtmpl": str(output_template),
                "quiet": False,
                "nocheckcertificate": True,
                "ca_certs": certifi.where(),
                "postprocessors": [
                    {
                        "key": "FFmpegExtractAudio",
                        "preferredcodec": "mp3",
                        "preferredquality": "192",
                    }
                ]
            }

            with Tracer.span("download_file"):

                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([source_url])

            logger.info(f"Finished download. File saved to: {final_output_path}.")
            
            return str(final_output_path)

        except Exception as e:

            logger.exception(f"Failed to download file: {e}")

            raise
