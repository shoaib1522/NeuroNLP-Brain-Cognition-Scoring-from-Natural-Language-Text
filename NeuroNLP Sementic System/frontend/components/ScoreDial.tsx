import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface Props { score: number; }

const ScoreDial: React.FC<Props> = ({ score }) => {
  const data = [{ value: score }];
  const fillColor = score > 75 ? '#22c55e' : score > 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="w-full h-80 bg-dark-card p-4 rounded-xl shadow-lg flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold text-light-text mb-2 text-center">Overall Brain Score</h3>
      <ResponsiveContainer width="100%" height="80%">
        <RadialBarChart innerRadius="70%" outerRadius="90%" barSize={30} data={data} startAngle={180} endAngle={0}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={15} fill={fillColor} />
          <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className="text-5xl font-bold" fill={fillColor}>{score}</text>
          <text x="50%" y="70%" textAnchor="middle" dominantBaseline="middle" className="text-lg" fill="#9ca3af">/ 100</text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreDial;