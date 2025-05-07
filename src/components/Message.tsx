
import React from 'react';
import { cn } from '@/lib/utils';

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  return (
    <div className={cn("message", isUser ? "user-message" : "bot-message")}>
      <div className="flex flex-col">
        <p className="text-sm">{text}</p>
        <span className="text-xs opacity-70 mt-1 self-end">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Message;
