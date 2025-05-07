
import React from 'react';
import { cn } from '@/lib/utils';

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  return (
    <div 
      className={cn(
        "message flex flex-col max-w-[85%] rounded-lg p-3 mb-3 shadow-md transition-all duration-300 animate-fade-in",
        isUser 
          ? "user-message bg-gradient-to-r from-purple-700 to-indigo-800 text-white ml-auto border-r-4 border-purple-400" 
          : "bot-message bg-gradient-to-r from-slate-800 to-slate-900 text-cyan-100 mr-auto border-l-4 border-cyan-400"
      )}
    >
      <div className="flex flex-col">
        <p className="text-sm whitespace-pre-wrap break-words">{text}</p>
        <span className={cn(
          "text-xs mt-1 self-end",
          isUser ? "text-purple-200 opacity-75" : "text-cyan-200 opacity-75"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Message;
