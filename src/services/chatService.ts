
// Chat service to communicate with the Flask backend

interface ChatResponse {
  reply: string;
}

class ChatService {
  private baseUrl: string;
  private isBackendAvailable: boolean = true;

  constructor() {
    // Update URL to use the correct host and port
    this.baseUrl = 'http://127.0.0.1:5000';
  }

  async checkConnection(): Promise<boolean> {
    try {
      console.log("Checking backend connection...");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${this.baseUrl}/ping`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log("Backend connection successful!");
        this.isBackendAvailable = true;
        return true;
      }
      
      console.error("Backend connection failed:", response.status);
      this.isBackendAvailable = false;
      return false;
    } catch (error) {
      console.error('Backend connection check failed:', error);
      this.isBackendAvailable = false;
      return false;
    }
  }

  async sendMessage(message: string): Promise<string> {
    // If we know the backend is unavailable, use fallback responses
    if (!this.isBackendAvailable) {
      return this.getFallbackResponse(message);
    }

    try {
      console.log("Sending message to backend:", message);
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      console.log("Received response from backend:", data.reply);
      return data.reply;
    } catch (error) {
      console.error('Error sending message to backend:', error);
      this.isBackendAvailable = false;
      return this.getFallbackResponse(message);
    }
  }

  private getFallbackResponse(message: string): string {
    // Basic fallback responses when backend is not available
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm Jarvis, your personal assistant. How can I help you today?";
    } else if (lowerMessage.includes('how are you') || lowerMessage.includes('how are u')) {
      return "I'm functioning optimally, thank you for asking! How can I assist you?";
    } else if (lowerMessage.includes('scrape')) {
      return "I'm sorry, web scraping is unavailable at the moment as I can't connect to the backend service.";
    } else if (lowerMessage.startsWith('www') || lowerMessage.includes('.com') || lowerMessage.includes('http')) {
      return "I detected a URL, but I can't scrape websites at the moment as the backend service is unavailable.";
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('forecast') || lowerMessage.includes('temperature')) {
      return "I'd love to help you check the weather, but I'm currently operating in offline mode. To get weather information, you'll need to ensure the Flask backend is running at http://127.0.0.1:5000. Make sure you've installed the necessary Python packages and started the Flask server.";
    } else if (lowerMessage.includes('search')) {
      return "I noticed you want to search for something. However, I'm currently in offline mode because I can't connect to the Flask backend. Please make sure the Flask server is running at http://127.0.0.1:5000 with all required dependencies installed.";
    } else {
      return "I'm sorry, I'm currently operating in offline mode and can't process complex requests. Try asking me simple questions or check if the Flask backend is running correctly at http://127.0.0.1:5000.";
    }
  }
}

export const chatService = new ChatService();
