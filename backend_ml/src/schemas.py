# File: backend_ml/src/schemas.py

from pydantic import BaseModel
from typing import Dict, List

class TextIn(BaseModel):
    """ The input data model for the text to be analyzed. """
    text: str

class AnalysisOut(BaseModel):
    """ The output data model containing all the calculated scores. """
    coherence_score: float
    grammar_score: float
    vocabulary_score: float
    emotion_scores: Dict[str, float]
    overall_brain_score: float