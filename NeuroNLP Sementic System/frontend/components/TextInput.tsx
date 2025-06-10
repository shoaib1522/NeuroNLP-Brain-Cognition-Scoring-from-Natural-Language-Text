import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
}

const TextInput: React.FC<Props> = ({ value, onChange, placeholder, disabled }) => (
  <textarea
    className="w-full h-48 p-4 bg-gray-700/50 text-light-text rounded-lg border-2 border-dark-border 
               focus:outline-none focus:ring-2 focus:ring-primary-accent transition-shadow duration-200
               disabled:opacity-50 disabled:cursor-not-allowed"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
  />
);

export default TextInput;