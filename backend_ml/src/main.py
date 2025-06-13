# File: backend_ml/src/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import TextIn, AnalysisOut
from . import orchestrator

# Create the FastAPI app instance
app = FastAPI(
    title="NeuroNLP Brain Cognition API",
    description="An API for analyzing text to score cognitive and emotional metrics.",
    version="1.0.0"
)

# --- Middleware ---
# This is crucial for allowing your React frontend (on a different port)
# to communicate with this backend.
origins = [
    "http://localhost",
    "http://localhost:3000", # Default port for React apps
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)


# --- API Endpoints ---

@app.get("/", tags=["Root"])
def read_root():
    """ A simple endpoint to check if the server is running. """
    return {"status": "ok", "message": "Welcome to the NeuroNLP API!"}


@app.post("/analyze", response_model=AnalysisOut, tags=["Analysis"])
def analyze_text_endpoint(request: TextIn):
    """
    The main endpoint to analyze text.
    Receives text and returns a full cognitive analysis.
    """
    return orchestrator.analyze_text(request)