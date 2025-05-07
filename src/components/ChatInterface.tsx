
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { chatService } from '@/services/chatService';
import { speechService } from '@/services/speechService';
import Message from './Message';
import JarvisLoader from './JarvisLoader';
import { Send, Mic, Circle, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageType {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      text: "Hello, I'm Jarvis. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    
    // Speak the latest bot message if it exists and speech is enabled
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && !latestMessage.isUser && !isMuted) {
      speechService.speak(latestMessage.text);
    }
  }, [messages, isMuted]);

  // Speak welcome message on first load
  useEffect(() => {
    if (!isMuted && messages.length > 0) {
      speechService.speak(messages[0].text);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(input);
      
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response from Jarvis',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleMute = () => {
    if (!isMuted) {
      speechService.stop();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-lg shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-75"></div>
              <Circle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Jarvis</h2>
              <p className="text-xs text-blue-300">AI Assistant</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMute} 
            className="text-slate-300 hover:bg-slate-800 hover:text-white"
            title={isMuted ? "Enable voice" : "Disable voice"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="message-container flex-1 bg-slate-900">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && <JarvisLoader />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message to Jarvis..."
            className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
          />
          <Button 
            onClick={handleSendMessage} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button 
            className="bg-slate-800 hover:bg-slate-700 text-slate-300"
            type="button"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Try: "Hello", "How are you" or "Tell me about yourself"
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
