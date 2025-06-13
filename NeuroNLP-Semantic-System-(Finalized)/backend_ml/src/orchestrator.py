# File: backend_ml/src/orchestrator.py

from .schemas import TextIn, AnalysisOut
from .analysis import coherence, emotion, grammar, vocabulary

def get_overall_score(
    coherence: float, 
    grammar: float, 
    vocab: float, 
    emotions: dict
) -> float:
    """
    Calculates the final "Brain Score" based on weighted metrics.
    """
    # Define weights for each component. These can be tuned.
    weights = {
        "coherence": 0.4,
        "grammar": 0.3,
        "vocabulary": 0.1,
        "emotion": 0.2
    }

    # For emotion, we can score it based on "clarity" or "positivity".
    # Let's create a "positivity" metric.
    positive_emotions = ['admiration', 'amusement', 'approval', 'caring', 'desire', 'excitement', 'gratitude', 'joy', 'love', 'optimism', 'pride', 'relief']
    
    emotion_clarity_score = 0.0
    if emotions:
        # Sum the scores of positive emotions
        positivity = sum(emotions.get(e, 0) for e in positive_emotions)
        # Normalize to a 0-100 scale. Max possible sum could be > 1, so cap it.
        emotion_clarity_score = min(1.0, positivity) * 100
        
    # Calculate weighted average
    final_score = (
        coherence * weights["coherence"] +
        grammar * weights["grammar"] +
        vocab * weights["vocabulary"] +
        emotion_clarity_score * weights["emotion"]
    )
    
    return round(final_score, 2)


def analyze_text(request: TextIn) -> AnalysisOut:
    """
    Orchestrates the full analysis pipeline.
    """
    text = request.text
    
    # Run all analyses
    coherence_score = coherence.get_coherence_score(text)
    grammar_score = grammar.get_grammar_score(text)
    vocab_score = vocabulary.get_vocabulary_score(text)
    emotion_scores = emotion.get_emotion_scores(text)
    
    # Calculate the final combined score
    overall_score = get_overall_score(
        coherence=coherence_score,
        grammar=grammar_score,
        vocab=vocab_score,
        emotions=emotion_scores
    )
    
    # Assemble the final response object
    response = AnalysisOut(
        coherence_score=coherence_score,
        grammar_score=grammar_score,
        vocabulary_score=vocab_score,
        emotion_scores=emotion_scores,
        overall_brain_score=overall_score
    )
    
    return response