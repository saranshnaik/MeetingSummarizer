# Run scripts on startup

# db/seeds/run_seeds.py

from scripts.seed_admin import seed_admin
from scripts.seed_prompts import seed_prompts


def run_seeds():
    seed_admin()
    seed_prompts()
