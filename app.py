from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Allow CORS for all domains

# Set your Gemini API endpoint and key
GEMINI_API_URL = "https://gemini.api.endpoint"  # Replace with actual endpoint
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    # Call the Gemini AI model
    headers = {
        'Authorization': f'Bearer {GEMINI_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        "messages": [{"role": "user", "content": user_message}]
    }

    response = requests.post(GEMINI_API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        bot_message = response.json().get('choices')[0].get('message').get('content')
        return jsonify({'response': bot_message})
    else:
        return jsonify({'response': 'Sorry, I could not process your request.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
