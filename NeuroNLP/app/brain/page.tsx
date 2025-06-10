"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data - in a real app, this would come from your API
const cognitiveData = [
  {
    category: "Grammar",
    score: 80,
    fullMark: 100,
  },
  {
    category: "Coherence",
    score: 90,
    fullMark: 100,
  },
  {
    category: "Vocabulary",
    score: 85,
    fullMark: 100,
  },
  {
    category: "Readability",
    score: 75,
    fullMark: 100,
  },
]

const emotionData = [
  { name: "Happy", value: 65, color: "#10b981" },
  { name: "Sad", value: 10, color: "#3b82f6" },
  { name: "Neutral", value: 20, color: "#6b7280" },
  { name: "Angry", value: 5, color: "#ef4444" },
  { name: "Surprised", value: 0, color: "#f59e0b" },
]

export default function BrainMetricsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 bg-[radial-gradient(ellipse_at_center,rgba(120,50,255,0.1),transparent_70%)]">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center font-orbitron bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Your Brain Metrics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-900/70 border-purple-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">Cognitive Profile</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={cognitiveData}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: "white", fontFamily: "var(--font-exo2)" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "white" }} />
                  <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 border-purple-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">Emotional Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Intensity"]}
                    contentStyle={{ backgroundColor: "#333", border: "none", fontFamily: "var(--font-exo2)" }}
                    labelStyle={{ color: "white" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 mt-8 gap-8">
          <Card className="bg-gray-900/70 border-purple-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">Metric Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cognitiveData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="category" tick={{ fill: "white", fontFamily: "var(--font-exo2)" }} />
                  <YAxis tick={{ fill: "white" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none", fontFamily: "var(--font-exo2)" }}
                    labelStyle={{ color: "white" }}
                  />
                  <Legend wrapperStyle={{ color: "white", fontFamily: "var(--font-exo2)" }} />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gray-900/70 border-purple-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white font-orbitron">Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 font-exo2 text-lg leading-relaxed">
              Your text demonstrates strong coherence and vocabulary usage, with a solid grammatical structure. The
              readability could be improved by using shorter sentences and simpler language in some sections.
              <span className="block mt-4"></span>
              Emotionally, your text conveys a predominantly{" "}
              <span className="text-green-400 font-semibold">positive tone (65%)</span> with some
              <span className="text-gray-400 font-semibold"> neutral elements (20%)</span> and slight
              <span className="text-blue-400 font-semibold"> sadness (10%)</span>.<span className="block mt-4"></span>
              Overall, your brain score is above average at <span className="text-purple-400 font-semibold">85%</span>,
              placing you in the top 25% of users.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
