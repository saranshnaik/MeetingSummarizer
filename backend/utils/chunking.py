# Chunking

def chunk_text(
    text: str,
    chunk_size: int = 4000,
    overlap: int = 300
):
    
    chunks = []

    start = 0

    while start < len(text):

        end = start + chunk_size

        chunk = text[start:end]

        chunks.append(chunk)

        start += chunk_size - overlap

    return chunks
