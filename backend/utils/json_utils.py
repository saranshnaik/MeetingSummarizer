# Json extraction

import re


def extract_json(
    text: str
) -> str:
    
    if not text:
        raise ValueError("No text provided to extract json.")
    
    text = re.sub(
        r"```json",
        "",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"```",
        "",
        text
    )

    text = text.strip()

    match = re.search(
        r"(\{.*\}|\[.*\])",
        text,
        re.DOTALL
    )

    if not match:
        raise ValueError("No JSON found in the response.")
    
    return match.group(1).strip()
