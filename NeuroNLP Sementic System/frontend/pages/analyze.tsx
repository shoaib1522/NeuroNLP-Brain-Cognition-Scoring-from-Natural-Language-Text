import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import TextInput from '../components/TextInput';
import VoiceInputButton from '../components/VoiceInputButton';
import ScoreDial from '../components/ScoreDial';
import CognitiveRadarChart from '../components/CognitiveRadarChart';
import EmotionBarChart from '../components/EmotionChart';

interface AnalysisResult {
  metrics: {
    cognitive: { clarity_score: number; vocabulary_richness: number };
    emotional_tone: { label: string; score: number }[];
  };
  overall_brain_score: number;
}

declare global { interface Window { SpeechRecognition: any; webkitSpeechRecognition: any; } }

export default function AnalyzePage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.onresult = (event: any) => { setText(prev => prev + event.results[event.results.length - 1][0].transcript); };
      recognition.onerror = (event: any) => { setError(`Speech error: ${event.error}`); setIsRecording(false); };
      recognition.onend = () => { setIsRecording(false); };
    }
  }, []);

  const handleVoiceInput = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsRecording(true);
        setError('');
      } else { setError('Speech recognition not supported.'); }
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return setError('Please enter some text.');
    setIsLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await axios.post('/api/proxy', { text });
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-light-text">Analyze Your Cognition</h1>
        <p className="text-lg text-subtle-text mt-2">Let's see what your words reveal.</p>
      </header>
      
      <section className="bg-dark-card p-6 rounded-xl shadow-2xl shadow-black/20">
        <TextInput
          value={text}
          onChange={setText}
          placeholder="Type, paste, or use your voice to input text here..."
          disabled={isLoading || isRecording}
        />
        <div className="flex items-center justify-between mt-4">
          <VoiceInputButton isRecording={isRecording} onClick={handleVoiceInput} disabled={isLoading} />
          <button
            onClick={handleAnalyze}
            className="px-8 py-3 font-bold text-lg bg-primary-accent rounded-lg text-white hover:bg-primary-hover transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || isRecording || !text.trim()}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </section>

      {error && <div className="mt-6 text-center text-red-400 bg-red-900/30 p-3 rounded-lg">{error}</div>}
      
      {isLoading && (
        <div className="mt-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent mx-auto"></div>
            <p className="mt-4 text-subtle-text">The AI is thinking...</p>
        </div>
      )}

      {result && (
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          <ScoreDial score={result.overall_brain_score} />
          <CognitiveRadarChart data={result.metrics.cognitive} />
          <div className="lg:col-span-2">
            <EmotionBarChart data={result.metrics.emotional_tone} />
          </div>
        </section>
      )}
    </div>
  );
}