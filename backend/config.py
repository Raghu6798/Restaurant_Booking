import os
from dotenv import load_dotenv
load_dotenv()

# API Keys
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
CEREBRAS_API_KEY = os.getenv("CEREBRAS_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
AI21_API_KEY = os.getenv("AI21_API_KEY")
