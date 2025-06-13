# File: backend_ml/src/analysis/coherence.py (Corrected Version)

from sentence_transformers import SentenceTransformer, util
import numpy as np
import nltk # We still need nltk for sentence tokenization

# Load the sentence-transformer model once. It will be downloaded automatically.
print("Loading coherence analysis model...")
coherence_model = SentenceTransformer('all-MiniLM-L6-v2')
print("Coherence model loaded.")

def get_coherence_score(text: str) -> float:
    """
    Calculates text coherence by measuring the average similarity
    between consecutive sentences. Returns a score from 0 to 100.
    """
    sentences = nltk.sent_tokenize(text)

    if len(sentences) < 2:
        return 100.0  # A single sentence is perfectly coherent by itself.

    # Generate embeddings for all sentences
    embeddings = coherence_model.encode(sentences, convert_to_tensor=True)

    # Calculate cosine similarity between consecutive sentences
    similarities = []
    for i in range(len(embeddings) - 1):
        sim = util.pytorch_cos_sim(embeddings[i], embeddings[i+1])
        similarities.append(sim.item())

    if not similarities:
        return 0.0

    average_similarity = np.mean(similarities)

    # Scale the score from -1 to 1 range of cosine sim to 0-100
    # For sentences, similarity is almost always positive.
    score = (average_similarity + 1) * 50

    return round(max(0, min(100, score)), 2)