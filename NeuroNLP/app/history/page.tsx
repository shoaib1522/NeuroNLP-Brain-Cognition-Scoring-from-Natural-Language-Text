"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Calendar, Smile, Frown, Meh } from "lucide-react"

// Sample data - in a real app, this would come from your database
const initialEntries = [
  {
    id: 1,
    date: "2023-05-15",
    brainScore: 85,
    emotion: "Happy",
    summary: "Strong coherence and vocabulary, good grammar, average readability. Predominantly positive tone.",
  },
  {
    id: 2,
    date: "2023-05-10",
    brainScore: 78,
    emotion: "Neutral",
    summary:
      "Good vocabulary, average coherence and grammar, needs improvement in readability. Neutral emotional tone.",
  },
  {
    id: 3,
    date: "2023-05-05",
    brainScore: 92,
    emotion: "Happy",
    summary: "Excellent grammar and coherence, strong vocabulary, good readability. Very positive emotional tone.",
  },
  {
    id: 4,
    date: "2023-04-28",
    brainScore: 65,
    emotion: "Sad",
    summary: "Average vocabulary and grammar, needs improvement in coherence and readability. Predominantly sad tone.",
  },
  {
    id: 5,
    date: "2023-04-20",
    brainScore: 73,
    emotion: "Angry",
    summary: "Good grammar, average vocabulary and coherence, below average readability. Shows signs of frustration.",
  },
]

export default function HistoryPage() {
  const [entries, setEntries] = useState(initialEntries)
  const [searchDate, setSearchDate] = useState("")
  const [selectedEntry, setSelectedEntry] = useState<(typeof initialEntries)[0] | null>(null)

  const handleSearch = () => {
    if (!searchDate) {
      setEntries(initialEntries)
      return
    }

    const filtered = initialEntries.filter((entry) => entry.date.includes(searchDate))
    setEntries(filtered)
  }

  const handleReanalyze = (entry: (typeof initialEntries)[0]) => {
    setSelectedEntry(entry)
    // In a real app, you would redirect to the analyze page with this entry's text
  }

  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "happy":
        return <Smile className="h-5 w-5 text-green-400" />
      case "sad":
        return <Frown className="h-5 w-5 text-blue-400" />
      case "angry":
        return <Frown className="h-5 w-5 text-red-400" />
      case "surprised":
        return <Meh className="h-5 w-5 text-yellow-400" />
      default:
        return <Meh className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 bg-[radial-gradient(ellipse_at_top,rgba(120,50,255,0.1),transparent_70%)]">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center font-orbitron bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          History Log
        </h1>

        <Card className="bg-gray-900/70 border-purple-900/50 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white font-orbitron">Filter Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  placeholder="Filter by date"
                  className="pl-10 bg-gray-800/70 border-purple-900/30 font-exo2"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-orbitron"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-purple-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white font-orbitron">Analysis History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-purple-900/30">
                  <TableHead className="text-white font-orbitron">Date</TableHead>
                  <TableHead className="text-white font-orbitron">Brain Score</TableHead>
                  <TableHead className="text-white font-orbitron">Emotion</TableHead>
                  <TableHead className="text-white font-orbitron">Summary</TableHead>
                  <TableHead className="text-white font-orbitron w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.length > 0 ? (
                  entries.map((entry) => (
                    <TableRow key={entry.id} className="border-purple-900/30 font-exo2">
                      <TableCell className="font-medium">{entry.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            entry.brainScore >= 90
                              ? "bg-green-900/70 text-green-300"
                              : entry.brainScore >= 75
                                ? "bg-blue-900/70 text-blue-300"
                                : entry.brainScore >= 60
                                  ? "bg-yellow-900/70 text-yellow-300"
                                  : "bg-red-900/70 text-red-300"
                          }`}
                        >
                          {entry.brainScore}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getEmotionIcon(entry.emotion)}
                          <span>{entry.emotion}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{entry.summary}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-600 text-purple-400 hover:bg-purple-900/50 hover:text-purple-200 font-exo2"
                          onClick={() => handleReanalyze(entry)}
                        >
                          Re-analyze
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-400 font-exo2">
                      No entries found for the selected date
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="bg-gray-900/90 border-purple-900/50 w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-white font-orbitron bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                  Re-analyze Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 font-exo2">
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p>{selectedEntry.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Previous Brain Score</p>
                    <p>{selectedEntry.brainScore}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Emotion</p>
                    <div className="flex items-center gap-2">
                      {getEmotionIcon(selectedEntry.emotion)}
                      <span>{selectedEntry.emotion}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Summary</p>
                    <p>{selectedEntry.summary}</p>
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedEntry(null)}
                      className="font-exo2 border-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-orbitron"
                      onClick={() => {
                        // In a real app, you would redirect to the analyze page with this entry's text
                        alert("Redirecting to analysis page...")
                        setSelectedEntry(null)
                      }}
                    >
                      Proceed
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
