// src/components/AnalysisDisplay.tsx
import { AnalysisResult } from '../lib/api';
import BrainScoreCharts from './BrainScoreCharts';

export default function AnalysisDisplay({ data }: { data: AnalysisResult }) {
  // Function to determine the color of the score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-center text-blue-300 mb-2">Analysis Complete!</h2>
        <div className="text-center p-4 bg-gray-900 rounded-lg">
          <h3 className="text-md font-semibold text-gray-400">Overall Brain Score</h3>
          <p className={`text-6xl font-extrabold ${getScoreColor(data.overall_brain_score)}`}>
            {data.overall_brain_score.toFixed(1)}
          </p>
        </div>
      </div>
      <BrainScoreCharts data={data} />
    </div>
  );
}