# Write to files

import json
from pathlib import Path

from pydantic import BaseModel


def write_to_file(
	path: str, 
	data: dict | str | BaseModel
) -> None:
	
	file = Path(path)

	with file.open("a", encoding="utf-8") as f:

		if isinstance(data, str):
			content = data
		
		elif isinstance(data, BaseModel):
			content = data.model_dump_json(indent=2)

		else:
			content = json.dumps(
				data,
				indent=2,
				ensure_ascii=False
			)

		f.write(content)
		f.write("\n\n")
