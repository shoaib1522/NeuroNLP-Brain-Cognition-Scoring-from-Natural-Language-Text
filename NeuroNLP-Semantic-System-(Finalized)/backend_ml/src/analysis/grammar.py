# File: backend_ml/src/analysis/grammar.py

import language_tool_python

# Load the grammar tool once. It may download components on its first run.
print("Initializing grammar tool...")
tool = language_tool_python.LanguageTool('en-US')
print("Grammar tool initialized.")

def get_grammar_score(text: str) -> float:
    """
    Calculates a grammar score based on the number of errors per 100 words.
    Returns a score from 0 to 100 (100 is perfect).
    """
    words = text.split()
    word_count = len(words)

    if word_count == 0:
        return 100.0

    matches = tool.check(text)
    error_count = len(matches)
    
    # Calculate errors per 100 words
    errors_per_100_words = (error_count / word_count) * 100
    
    # Convert error rate to a score from 0-100.
    # We can decide that 10 errors per 100 words results in a score of 0.
    score = max(0, 100 - (errors_per_100_words * 10))
    
    return round(score, 2)