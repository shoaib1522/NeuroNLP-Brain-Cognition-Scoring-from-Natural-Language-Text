import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Unlock Your Mind
        </span>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-subtle-text max-w-2xl">
        Discover the cognitive and emotional patterns hidden in your words. Our AI analyzes your text to reveal insights about clarity, vocabulary, and tone.
      </p>
      <Link href="/analyze">
        <a className="mt-12 px-10 py-4 text-xl font-bold rounded-lg bg-primary-accent text-white shadow-lg shadow-purple-500/30
                       hover:bg-primary-hover transition-all duration-300 transform hover:scale-105">
          Start Analysis
        </a>
      </Link>
    </div>
  );
}