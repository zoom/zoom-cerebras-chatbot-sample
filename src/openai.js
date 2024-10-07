const axios = require('axios');
const { getChatbotToken } = require('./zoomAuth');
const { sendChatToZoom } = require('./sendChatbotMessage');

let conversationHistory = {};

async function callOpenAIAPI(payload) {
  try {
    const userJid = payload.toJid;
    const history = conversationHistory[userJid] || [];
    const requestData = {
      model: 'gpt-4o',
      messages: [
        ...history,
        { role: 'user', content: payload.cmd }
      ],
      temperature: 0.7,
      max_tokens: 500
    };
    const apiKey = process.env.OPENAI_API_KEY;
    const baseURL = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };

    const response = await axios.post(baseURL, requestData, { headers });
    const completion = response.data.choices[0].message.content;

    // Save conversation history
    conversationHistory[userJid] = [
      ...requestData.messages,
      { role: 'assistant', content: completion }
    ];
    
    // Get Zoom chatbot token and send message to Zoom
    const chatbotToken = await getChatbotToken();
    await sendChatToZoom(chatbotToken, completion, payload);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}

module.exports = { callOpenAIAPI };module.exports = { callOpenAIAPI };