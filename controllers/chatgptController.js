const axios = require('axios');
const config = require('../config/config');

exports.textToText = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt,
      maxTokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${config.chatGPTAPIKey}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.textToImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt,
      n: 1,
      size: "1024x1024"
    }, {
      headers: {
        'Authorization': `Bearer ${config.chatGPTAPIKey}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.imageToText = async (req, res) => {
  try {
    const { image } = req.body;

    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      image
    }, {
      headers: {
        'Authorization': `Bearer ${config.chatGPTAPIKey}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
