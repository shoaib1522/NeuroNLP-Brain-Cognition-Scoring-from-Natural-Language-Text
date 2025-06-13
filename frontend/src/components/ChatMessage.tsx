// src/components/ChatMessage.tsx
import AnalysisDisplay from './AnalysisDisplay';
import { Message } from '../app/page'; // We import the 'Message' type from our main page

export default function ChatMessage({ message }: { message: Message }) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-2xl ${isBot ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white'}`}>
        {/* If the message is from the bot AND has analysis data, show the charts */}
        {isBot && message.analysis ? (
          <AnalysisDisplay data={message.analysis} />
        ) : (
          // Otherwise, just show the plain text
          <p>{message.text}</p>
        )}
      </div>
    </div>
  );
}