FROM python:3.12-slim

WORKDIR /app

# system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

# install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# install dependencies
COPY pyproject.toml uv.lock ./

RUN uv venv
RUN uv sync --frozen --no-dev

# copy source
COPY . .

EXPOSE 8000

ENV PATH="/app/.venv/bin:$PATH"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]