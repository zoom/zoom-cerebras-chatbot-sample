const axios = require('axios');
const { getChatbotToken } = require('./zoomAuth');
const { sendChatToZoom } = require('./sendChatbotMessage');

let conversationHistory = {};

async function callCohereAPI(payload) {
  try {
    const userJid = payload.toJid;
    const history = conversationHistory[userJid] || [];
    const requestData = {
      model: 'command-r-plus-08-2024',
      messages: [
        ...history,
        { role: 'user', content: payload.cmd }

      ],
      temperature: 0.8,
      max_tokens: 500
    };
    const apiKey = process.env.COHERE_API_KEY;
    const baseURL = 'https://api.cohere.com/v2/chat';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'X-Client-Name': 'Zoom-Cohere-Chatbot'
    };

    const response = await axios.post(baseURL, requestData, { headers });
    const completion = response.data.message.content[0].text;

    // Save conversation history
    conversationHistory[userJid] = [
      ...requestData.messages,
      { role: 'assistant', content: completion }

    ];
    
    // Get Zoom chatbot token and send message to Zoom
    const chatbotToken = await getChatbotToken();
    await sendChatToZoom(chatbotToken, completion, payload);
  } catch (error) {
    console.error('Error calling Cohere API:', error);
  }
}

module.exports = { callCohereAPI };