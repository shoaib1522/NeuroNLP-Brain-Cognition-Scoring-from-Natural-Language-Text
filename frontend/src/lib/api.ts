// src/lib/api.ts
import axios from 'axios';

// This defines the "shape" of the data we expect from the backend.
// It must match the AnalysisOut schema in your Python code.
export interface AnalysisResult {
  coherence_score: number;
  grammar_score: number;
  vocabulary_score: number;
  emotion_scores: { [key: string]: number };
  overall_brain_score: number;
}

const API_URL = 'http://127.0.0.1:8000/analyze';

// This function sends the text to the backend and returns the results.
export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await axios.post<AnalysisResult>(API_URL, {
      text: text,
    });
    return response.data;
  } catch (error) {
    console.error("Error calling analysis API:", error);
    // This will be caught by the main page to show an error message.
    throw new Error('Failed to get analysis from the server.');
  }
};