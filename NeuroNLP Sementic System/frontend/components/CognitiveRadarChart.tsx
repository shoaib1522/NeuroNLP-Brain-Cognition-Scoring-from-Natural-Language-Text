import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Props { data: { clarity_score: number; vocabulary_richness: number; }; }

const CognitiveRadarChart: React.FC<Props> = ({ data }) => {
  const chartData = [
    { subject: 'Clarity', score: data.clarity_score, fullMark: 100 },
    { subject: 'Vocabulary', score: data.vocabulary_richness, fullMark: 100 },
  ];

  return (
    <div className="w-full h-80 bg-dark-card p-4 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-light-text mb-4 text-center">Cognitive Metrics</h3>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="subject" stroke="#e5e7eb" />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
          <Radar name="Your Score" dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CognitiveRadarChart;