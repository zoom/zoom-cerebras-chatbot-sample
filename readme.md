# Zoom-OpenAI-Chatbot

This project integrates OpenAI's advanced language models with Zoom Team Chat, creating an intelligent chatbot that can assist users directly within their Zoom conversations. The bot leverages OpenAI's powerful natural language processing capabilities to provide helpful responses to user queries on a wide range of topics.

## What the Chatbot Does

- Responds to user messages in Zoom Team Chat using OpenAI's language models.
- Maintains conversation history for context-aware responses.
- Can be used in direct messages or invoked in group chats and channels.
- Provides helpful information, answers questions, assists with tasks, and engages in discussions on various topics.

## Prerequisites

Before you can use this chatbot, you'll need the following:

- Node.js (version 12 or later)
- A Zoom account
- An OpenAI account

## Setup

First, clone the repository:


git clone https://github.com/zoom/zoom-openai-chatbot
cd zoom-openai-chatbot


Next, install the required Node.js packages:


npm install

## Configuration
You need to set up your environment variables. Create a `.env` file in the project root and add the following variables:

``` bash
ZOOM_CLIENT_ID=your_zoom_client_id
ZOOM_CLIENT_SECRET=your_zoom_client_secret
ZOOM_BOT_JID=your_zoom_bot_jid
ZOOM_WEBHOOK_SECRET_TOKEN=your_zoom_webhook_secret_token
OPENAI_API_KEY=your_openai_api_key
BOT_NOTIFICATION_URL=your_custom_endpoint ex: openai

```

To obtain these variables:

- For Zoom variables (ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_BOT_JID, ZOOM_WEBHOOK_SECRET_TOKEN, ZOOM_VERIFICATION_CODE), refer to the [Zoom App Marketplace guide on creating a Team Chat app](https://developers.zoom.us/docs/team-chat-apps/create/).

- For the OPENAI_API_KEY, you can obtain it from your OpenAI account dashboard.

## Running the Application

To start the application:


node index.js

The application will run on `http://localhost:4000/` by default, but you can set a different port by changing the `PORT` variable in your `.env` file. The custom endpoint for bot notifications is defined by the `BOT_NOTIFICATION_URL` variable.

## Usage

1. In your Zoom Team Chat App's Credentials section, go to the Local Test or Submit page depending on which environment you are using (Development or Production), and click "Add".

2. After authorizing, you will be redirected to Zoom Team Chat and see a message from the chatbot:

   "Greetings from Zoom-OpenAI-Chatbot!"

3. To use the bot, type a message in the chat like this:

   "Hi My name is Ojus and I want you to write a poem on zoom developer platform"

4. The response from the bot will look like this:

   [AI-generated poem about Zoom Developer Platform]

   ![Query Example](/images/image.png)

5. The bot remembers context from previous messages:

   ![Context Example](/images/image%202.png)


6. If you want to use the bot in a chat or a channel, you can invoke the bot with a "/" command:
   Example:
   `/openai-bot Tell me about the history of San Francisco`
## Key Functions

Our codebase includes several important functions that drive the chatbot's functionality:

- `handleZoomWebhook` (src/zoomWebhookHandler.js): This function processes incoming webhook events from Zoom. It handles different event types, including bot notifications, installations, and uninstallations. For message events, it triggers the OpenAI API call.

- `callOpenAIAPI` (src/openai.js): This function is responsible for interacting with the OpenAI API. It prepares the conversation history, sends the user's message to OpenAI, and processes the AI-generated response. It also manages the conversation history for context-aware responses.

- `getChatbotToken` (src/zoomAuth.js): This function obtains an authentication token from Zoom, which is necessary for sending messages back to the Zoom chat. It uses the client credentials flow for secure authentication.

- `sendChatToZoom` (src/sendChatbotMessage.js): After receiving a response from OpenAI, this function sends the AI-generated message back to the Zoom chat. It formats the message and uses the Zoom API to deliver the response to the correct chat or channel.

These functions work together to create a seamless flow from receiving a user message in Zoom, processing it with OpenAI's AI, and sending the response back to the user in Zoom Team Chat.

This README provides a comprehensive overview of the Zoom-OpenAI-Chatbot project, including setup instructions, usage guidelines, and explanations of key functions.

## License

This project is licensed under the MIT License:

MIT License

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


