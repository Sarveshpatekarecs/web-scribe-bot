
from flask import Flask, request, jsonify
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Set up the chatbot
chatbot = ChatBot('AI Chatbot', storage_adapter='chatterbot.storage.SQLStorageAdapter', 
                  logic_adapters=[
                      'chatterbot.logic.BestMatch',
                      'chatterbot.logic.MathematicalEvaluation'
                  ])

# Train the chatbot with English corpus
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train('chatterbot.corpus.english')

# Simple web scraper
def scrape_website(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=5)
        soup = BeautifulSoup(response.text, 'html.parser')
        text = soup.get_text(separator=' ', strip=True)
        return text[:1000]  # Return only first 1000 characters
    except Exception as e:
        return f"Failed to scrape the website: {str(e)}"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    # If message is a scrape command: "scrape https://example.com"
    if message.startswith("scrape "):
        url = message.replace("scrape ", "").strip()
        scraped = scrape_website(url)
        return jsonify({"reply": scraped})

    # Get chatbot's response
    response = chatbot.get_response(message)
    return jsonify({"reply": str(response)})

if __name__ == '__main__':
    app.run(debug=True)
