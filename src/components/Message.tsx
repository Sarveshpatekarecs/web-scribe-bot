
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
        "message flex flex-col",
        isUser 
          ? "user-message bg-blue-800 text-white" 
          : "bot-message bg-slate-800 text-blue-100"
      )}
    >
      <div className="flex flex-col">
        <p className="text-sm whitespace-pre-wrap">{text}</p>
        <span className={cn(
          "text-xs mt-1 self-end",
          isUser ? "text-blue-200 opacity-75" : "text-slate-400 opacity-75"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Message;
