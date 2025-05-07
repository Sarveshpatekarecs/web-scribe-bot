
import React from 'react';

const JarvisLoader: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 p-2 bot-message">
      <div className="relative w-3 h-3">
        <div className="pulse-ring bg-sky-500"></div>
        <div className="absolute inset-0 bg-sky-400 rounded-full"></div>
      </div>
      <span className="text-sm">Jarvis is thinking...</span>
    </div>
  );
};

export default JarvisLoader;
