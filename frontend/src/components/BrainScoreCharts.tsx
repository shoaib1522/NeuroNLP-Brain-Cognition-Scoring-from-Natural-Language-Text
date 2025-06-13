// src/components/BrainScoreCharts.tsx
'use client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnalysisResult } from '../lib/api';

export default function BrainScoreCharts({ data }: { data: AnalysisResult }) {
  // Prepare data for the Radar Chart (main scores)
  const radarData = [
    { name: 'Coherence', score: data.coherence_score, fullMark: 100 },
    { name: 'Grammar', score: data.grammar_score, fullMark: 100 },
    { name: 'Vocabulary', score: data.vocabulary_score, fullMark: 100 },
    { name: 'Brain Score', score: data.overall_brain_score, fullMark: 100 },
  ];
  
  // Prepare data for the Bar Chart (top 5 emotions)
  const topEmotions = Object.entries(data.emotion_scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, score]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      score: parseFloat((score * 100).toFixed(1)),
    }));
  
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
      {/* Radar Chart Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
        <h3 className="text-lg font-bold mb-4 text-center">Cognitive Metrics</h3>
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#4b5563" />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#e5e7eb', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af' }}/>
            <Radar name="Your Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6}/>
            <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderColor: '#4b5563' }}/>
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Bar Chart Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
        <h3 className="text-lg font-bold mb-4 text-center">Top Emotions Detected</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topEmotions} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#e5e7eb', fontSize: 12 }} />
            <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#e5e7eb', fontSize: 12 }} />
            <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)'}} contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderColor: '#4b5563' }} formatter={(value: number) => `${value.toFixed(1)}%`}/>
            <Bar dataKey="score" fill="#8884d8" background={{ fill: 'rgba(75, 85, 99, 0.2)' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}