import React from 'react';
import { MicrophoneIcon } from '@heroicons/react/24/solid';

interface Props {
  isRecording: boolean;
  onClick: () => void;
  disabled: boolean;
}

const VoiceInputButton: React.FC<Props> = ({ isRecording, onClick, disabled }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors duration-200
                ${isRecording 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
    disabled={disabled}
  >
    <MicrophoneIcon className="h-6 w-6" />
    <span>{isRecording ? 'Stop Recording' : 'Use Mic'}</span>
  </button>
);

export default VoiceInputButton;