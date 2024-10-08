# utils/geminiAPI.py

import requests
import json
import sys

API_KEY = "ask-for-key-to-ayush"  

def call_gemini_api(content):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": content  
                    }
                ]
            }
        ]
    }

    headers = {
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Error response status: {response.status_code}", "details": response.json()}

    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

# Main program execution
if __name__ == "__main__":
    content = sys.argv[1]  # Get content from command-line arguments
    result = call_gemini_api(content)
    print(json.dumps(result))  # Print result in JSON format so Node.js can read it
