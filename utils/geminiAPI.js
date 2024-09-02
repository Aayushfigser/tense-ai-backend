// utils/geminiAPI.js

const axios = require('axios');
const config = require('../config/config');

async function callGeminiAPI(data) {
    try {
        const apiKey = config.geminiAPIKey;  // Replace with your actual API key
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const response = await axios.post(url, {
            contents: [
                {
                    parts: [
                        {
                            text: data.prompt  // Use the prompt passed in the request body
                        }
                    ]
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw new Error('Failed to call Gemini API');
    }
}

module.exports = callGeminiAPI;
