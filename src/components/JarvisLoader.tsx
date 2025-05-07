
import React from 'react';

const JarvisLoader: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 p-3 bot-message bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm max-w-[60%] rounded-lg border-l-2 border-cyan-400/50 mr-auto shadow-md">
      <div className="flex space-x-1">
        {[1, 2, 3].map((dot) => (
          <div 
            key={dot} 
            className="relative w-2.5 h-2.5"
            style={{ animation: `bounce 1.4s ease-in-out ${(dot - 1) * 0.16}s infinite both` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-70"></div>
          </div>
        ))}
      </div>
      <span className="text-sm text-cyan-300">Jarvis is thinking...</span>
    </div>
  );
};

export default JarvisLoader;
