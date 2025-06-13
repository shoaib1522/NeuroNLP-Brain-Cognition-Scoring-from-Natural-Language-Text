# File: backend_ml/src/analysis/vocabulary.py

import spacy

# Load the spaCy model once, disable unnecessary components for speed.
print("Loading spaCy model for vocabulary analysis...")
nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
print("spaCy model loaded.")

def get_vocabulary_score(text: str) -> float:
    """
    Calculates vocabulary richness using Type-Token Ratio (TTR).
    Returns a score from 0 to 100.
    """
    doc = nlp(text)
    
    # Filter out punctuation and spaces, and convert to lower case
    words = [token.lower_ for token in doc if token.is_alpha]
    
    if not words:
        return 0.0

    total_words = len(words)
    unique_words = len(set(words))
    
    ttr = unique_words / total_words
    
    # Scale score to be more intuitive (e.g., 0-100)
    # A simple linear scaling can work well. A TTR of 0.7 is very rich.
    # We can scale it such that 0.7 TTR -> ~100 points.
    score = min(100.0, (ttr / 0.7) * 100)

    return round(score, 2)