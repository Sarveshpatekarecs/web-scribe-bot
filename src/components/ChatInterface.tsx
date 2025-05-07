
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { chatService } from '@/services/chatService';
import { speechService } from '@/services/speechService';
import Message from './Message';
import JarvisLoader from './JarvisLoader';
import { Send, Mic, Circle, Volume2, VolumeX, Sparkles, RefreshCw, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const messageContainerRef = useRef<HTMLDivElement>(null);

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

  const checkBackendConnection = async () => {
    setIsConnecting(true);
    try {
      await chatService.checkConnection();
      toast({
        title: 'Connection Successful',
        description: 'Connected to the Jarvis backend server',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: 'Could not connect to the Jarvis backend server. Running in offline mode.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
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
    toast({
      title: isMuted ? "Voice Enabled" : "Voice Disabled",
      description: isMuted ? "Jarvis will now speak responses" : "Jarvis will no longer speak responses",
    });
  };

  return (
    <Card className="flex flex-col h-[75vh] bg-gradient-to-b from-gray-900 to-slate-900 rounded-xl shadow-2xl overflow-hidden border border-purple-500/30">
      <CardHeader className="bg-gradient-to-r from-slate-800 to-purple-900 p-4 border-b border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full animate-pulse opacity-60 bg-cyan-400 blur-sm"></div>
              <Circle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Jarvis</h2>
              <p className="text-xs text-cyan-300/80">AI Assistant</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMute} 
              className="text-slate-300 hover:bg-purple-900/40 hover:text-white"
              title={isMuted ? "Enable voice" : "Disable voice"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={checkBackendConnection}
              disabled={isConnecting}
              className="text-slate-300 hover:bg-purple-900/40 hover:text-white"
              title="Check backend connection"
            >
              {isConnecting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <div 
          ref={messageContainerRef}
          className="message-container flex-1 h-full bg-gradient-to-b from-gray-900/95 to-slate-900/95 p-4 overflow-y-auto"
          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2MiwgODksIDE1NCwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')" }}
        >
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
      </CardContent>

      <div className="p-4 border-t border-purple-500/30 bg-slate-900/90 backdrop-blur-sm">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Jarvis anything..."
            className="flex-1 bg-slate-800/90 border-slate-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <Button 
            onClick={handleSendMessage} 
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-lg"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4 mr-1" />
            Send
          </Button>
          <Button 
            className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
            type="button"
            title="Voice input (coming soon)"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-slate-400 italic">
            Try: "Hello", "Tell me about yourself" or "Search for something"
          </p>
          <div className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-xs text-cyan-400">AI Powered</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
