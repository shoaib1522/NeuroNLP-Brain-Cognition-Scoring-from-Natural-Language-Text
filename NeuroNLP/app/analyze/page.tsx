"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Smile, Frown, Meh } from "lucide-react"

export default function AnalyzePage() {
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    brainScore: number
    emotions: {
      happy: number
      sad: number
      neutral: number
      angry: number
      surprised: number
    } | null
  } | null>(null)

  const handleAnalyze = () => {
    if (!text.trim()) return

    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      setResult({
        brainScore: 85,
        emotions: {
          happy: 65,
          sad: 10,
          neutral: 20,
          angry: 5,
          surprised: 0,
        },
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleVoiceInput = () => {
    // Voice input functionality would be implemented here
    alert("Voice input feature coming soon!")
  }

  // Function to determine the dominant emotion
  const getDominantEmotion = () => {
    if (!result?.emotions) return null

    const emotions = result.emotions
    const max = Math.max(emotions.happy, emotions.sad, emotions.neutral, emotions.angry, emotions.surprised)

    if (max === emotions.happy) return { name: "Happy", icon: <Smile className="h-8 w-8 text-green-400" /> }
    if (max === emotions.sad) return { name: "Sad", icon: <Frown className="h-8 w-8 text-blue-400" /> }
    if (max === emotions.angry) return { name: "Angry", icon: <Frown className="h-8 w-8 text-red-400" /> }
    if (max === emotions.surprised) return { name: "Surprised", icon: <Meh className="h-8 w-8 text-yellow-400" /> }
    return { name: "Neutral", icon: <Meh className="h-8 w-8 text-gray-400" /> }
  }

  const dominantEmotion = getDominantEmotion()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 bg-[radial-gradient(ellipse_at_top,rgba(120,50,255,0.1),transparent_70%)]">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-4xl font-bold text-center font-orbitron bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Text Analysis
        </h1>

        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Type or paste your thoughts here..."
              className="min-h-[200px] bg-gray-900/70 border-purple-900/50 resize-none font-exo2 text-lg rounded-xl backdrop-blur-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-purple-900/50"
              onClick={handleVoiceInput}
            >
              <Mic className="h-5 w-5" />
              <span className="sr-only">Voice input</span>
            </Button>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-orbitron text-lg py-6 rounded-xl"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </div>

        {(isAnalyzing || result) && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-purple-900/30">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold font-orbitron">
                    {isAnalyzing ? "..." : `${result?.brainScore}%`}
                  </span>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-800 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-purple-500 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={isAnalyzing ? "0 251.2" : `${(result?.brainScore || 0) * 2.512} 251.2`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <p className="text-xl font-medium font-orbitron bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                Brain Score
              </p>
            </div>

            {result && !isAnalyzing && (
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center justify-center gap-4">
                  {dominantEmotion?.icon}
                  <span className="text-2xl font-orbitron">{dominantEmotion?.name}</span>
                </div>

                <div className="w-full space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-exo2">Happy</span>
                      <span className="font-exo2">{result.emotions.happy}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${result.emotions.happy}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-exo2">Sad</span>
                      <span className="font-exo2">{result.emotions.sad}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${result.emotions.sad}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-exo2">Neutral</span>
                      <span className="font-exo2">{result.emotions.neutral}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500 rounded-full"
                        style={{ width: `${result.emotions.neutral}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-exo2">Angry</span>
                      <span className="font-exo2">{result.emotions.angry}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${result.emotions.angry}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-exo2">Surprised</span>
                      <span className="font-exo2">{result.emotions.surprised}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${result.emotions.surprised}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
