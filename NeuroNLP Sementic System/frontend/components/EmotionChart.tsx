import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props { data: { label: string; score: number }[]; }

const EmotionBarChart: React.FC<Props> = ({ data }) => {
  const chartData = data
    .map(e => ({ name: e.label.charAt(0).toUpperCase() + e.label.slice(1), score: parseFloat((e.score * 100).toFixed(1)) }))
    .sort((a, b) => b.score - a.score);
  
  const colors = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];

  return (
    <div className="w-full h-96 bg-dark-card p-4 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-light-text mb-4 text-center">Emotional Tone Distribution</h3>
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" />
          <YAxis dataKey="name" type="category" width={80} stroke="#9ca3af" tick={{ fill: '#e5e7eb' }} />
          <Tooltip cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
          <Bar dataKey="score" name="Confidence (%)" barSize={25}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionBarChart;