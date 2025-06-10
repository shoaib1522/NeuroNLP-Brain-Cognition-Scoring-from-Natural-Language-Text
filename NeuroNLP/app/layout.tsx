import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Rajdhani, Exo_2 } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Brain } from "lucide-react"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
})

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
})

export const metadata: Metadata = {
  title: "NeuroNLP: Brain Score from Text",
  description: "Analyze the cognitive complexity and emotional tone of your thoughts using AI.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable} ${exo2.variable} bg-black text-white font-rajdhani`}>
        <header className="border-b border-purple-900/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-500" />
              <span className="font-orbitron font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                NeuroNLP
              </span>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link href="/analyze" className="text-gray-300 hover:text-purple-400 transition-colors">
                Analyze
              </Link>
              <Link href="/brain" className="text-gray-300 hover:text-purple-400 transition-colors">
                Metrics
              </Link>
              <Link href="/history" className="text-gray-300 hover:text-purple-400 transition-colors">
                History
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
