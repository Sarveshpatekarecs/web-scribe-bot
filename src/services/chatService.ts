
// Chat service to communicate with the Flask backend

interface ChatResponse {
  reply: string;
}

class ChatService {
  private baseUrl: string;

  constructor() {
    // Update this URL based on where your Flask backend is running
    this.baseUrl = 'http://localhost:5000';
  }

  async sendMessage(message: string): Promise<string> {
    try {
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
      return data.reply;
    } catch (error) {
      console.error('Error sending message:', error);
      return 'Sorry, I experienced an error while processing your request.';
    }
  }
}

export const chatService = new ChatService();
