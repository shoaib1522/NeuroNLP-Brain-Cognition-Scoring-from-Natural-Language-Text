// src/app/page.tsx
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { analyzeText, AnalysisResult } from '../lib/api';
import ChatMessage from '../components/ChatMessage';

// Define the structure for a message in our chat
export interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  analysis?: AnalysisResult; // Analysis data is optional
}

export default function ChatPage() {
  // State for the list of messages in the chat
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm NeuroNLP. Paste any text you've written, and I'll give you a detailed cognitive analysis.",
    },
  ]);
  // State for the user's current input in the text box
  const [input, setInput] = useState('');
  // State to track if the API is currently loading a result
  const [isLoading, setIsLoading] = useState(false);
  // A reference to the end of the chat window to auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to automatically scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll whenever the 'messages' state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 1. Add the user's message to the chat
    const userMessage: Message = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Call the backend API
      const result = await analyzeText(input);
      // 3. Add the bot's analysis result to the chat
      const botMessage: Message = { id: Date.now() + 1, sender: 'bot', text: 'Here is your analysis:', analysis: result };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // 4. If the API fails, add an error message to the chat
      const errorMessage: Message = { id: Date.now() + 1, sender: 'bot', text: 'Sorry, I encountered an error. Please ensure the backend server is running and try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // 5. Re-enable the input field
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 bg-gray-800 border-b border-gray-700 shadow-sm">
        <h1 className="text-xl font-bold text-center">NeuroNLP 🧠</h1>
      </header>
      
      {/* Chat Messages Area */}
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-gray-700 text-white flex items-center space-x-2">
                    <span className="text-gray-400">Analyzing</span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Form Area */}
      <footer className="p-4 bg-gray-900 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your text and press Enter..."
            className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
            rows={1}
            disabled={isLoading}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={isLoading || !input.trim()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" /></svg>
          </button>
        </form>
      </footer>
    </div>
  );
}