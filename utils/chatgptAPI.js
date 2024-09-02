// utils/chatgptAPI.js
const axios = require('axios');

const callChatGPTAPI = async (messages) => {
  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt: messages,
    max_tokens: 150
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });
  return response.data;
};

module.exports = callChatGPTAPI;
