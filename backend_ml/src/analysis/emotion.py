# File: backend_ml/src/analysis/emotion.py

from transformers import pipeline

# IMPORTANT: This loads the model once when the server starts, not for every request.
# The model will be downloaded automatically the first time this line runs.
print("Loading emotion analysis model...")
emotion_classifier = pipeline(
    "text-classification", 
    model="SamLowe/roberta-base-go_emotions", 
    top_k=None # Get scores for all emotions
)
print("Emotion model loaded.")

def get_emotion_scores(text: str) -> dict:
    """
    Analyzes the text and returns a dictionary of emotions and their scores.
    """
    if not text.strip():
        return {}

    # The pipeline returns a list of lists of dictionaries. We process it.
    model_output = emotion_classifier(text)
    
    # Flatten the result and convert it into a simple {label: score} dictionary
    processed_scores = {d['label']: d['score'] for d in model_output[0]}
    
    return processed_scores