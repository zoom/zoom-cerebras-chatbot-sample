const axios = require('axios');
const { getChatbotToken } = require('./zoomAuth');
const { sendChatToZoom } = require('./sendChatbotMessage');

let conversationHistory = {};

async function callCerebrasAPI(payload) {
  try {
    const userJid = payload.toJid;
    const history = conversationHistory[userJid] || [];
    const requestData = {
      model: 'llama3.1-8b',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...history,
        { role: 'user', content: payload.cmd }
      ],
      max_tokens: 500,
      stream: true
    };
    const apiKey = process.env.CEREBRAS_API_KEY;
    const baseURL = 'https://api.cerebras.ai/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };

    const response = await axios.post(baseURL, requestData, { 
      headers,
      responseType: 'stream'
    });

    let completion = '';
    for await (const chunk of response.data) {
      const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        const trimmedLine = line.replace(/^data: /, '');
        if (trimmedLine !== '[DONE]') {
          const parsed = JSON.parse(trimmedLine);
          const content = parsed.choices[0].delta.content;
          if (content) {
            completion += content;
          }
        }
      }
    }

    // Save conversation history
    conversationHistory[userJid] = [
      ...requestData.messages,
      { role: 'assistant', content: completion }
    ];
    
    // Get Zoom chatbot token and send message to Zoom
    const chatbotToken = await getChatbotToken();
    await sendChatToZoom(chatbotToken, completion, payload);
  } catch (error) {
    console.error('Error calling Cerebras API:', error);
  }
}

module.exports = { callCerebrasAPI };