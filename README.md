
# Jarvis AI Assistant

An AI assistant with a beautiful UI that connects to a Python Flask backend for intelligent responses.

## Features

- Modern, dynamic UI with gradient animations
- Real-time chat interface
- Text-to-speech capabilities with female voice
- Web scraping functionality (when backend is running)
- Fallback responses when offline

## Getting Started

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Backend Setup

1. Navigate to the `backend` directory
2. Install the required Python packages:
```bash
pip install flask chatterbot==1.0.4 chatterbot-corpus requests beautifulsoup4 flask-cors
```

3. Start the Flask server:
```bash
python app.py
```

The backend will run on `http://127.0.0.1:5000`.

## How to Use

- Type messages in the input field and press Enter or click the Send button
- Try commands like:
  - "Hello" or "Hi" - Basic greeting
  - "How are you?" - Ask about Jarvis
  - "scrape https://example.com" - Scrape content from a website (requires backend)
  - "Search for something" - Perform a search (requires backend)
  - Weather-related questions (requires backend)

## Troubleshooting

If the frontend can't connect to the backend:

1. Make sure the Flask server is running
2. Check that it's running on port 5000
3. Verify that the required Python packages are installed
4. Check for any CORS issues in the browser console
5. Try restarting both the frontend and backend servers

## Voice Controls

- Toggle the speaker icon to enable/disable voice responses
- Adjust voice settings in the speechService.ts file if needed

## Backend Information

The backend uses:
- Flask for API endpoints
- ChatterBot for AI responses
- BeautifulSoup for web scraping
- Flask-CORS for handling cross-origin requests

## Note

This project demonstrates a React frontend with a Python backend integration. For production use, additional security measures and optimizations should be implemented.
