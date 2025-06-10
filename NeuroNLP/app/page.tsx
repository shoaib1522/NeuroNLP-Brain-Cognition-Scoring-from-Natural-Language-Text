import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white bg-[radial-gradient(ellipse_at_center,rgba(120,50,255,0.1),transparent_70%)]">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <div className="animate-pulse relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/30 animate-ping"></div>
          <Brain className="h-32 w-32 text-purple-500 relative z-10" />
        </div>
        <h1 className="font-orbitron text-5xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">
          NeuroNLP: Brain Score from Text
        </h1>
        <p className="max-w-md text-xl text-gray-400 font-exo2">
          Analyze the cognitive complexity and emotional tone of your thoughts using AI.
        </p>
        <Link href="/analyze">
          <Button className="mt-6 h-12 px-8 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-orbitron">
            Start Analysis
          </Button>
        </Link>
      </div>
    </div>
  )
}
