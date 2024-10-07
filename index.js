require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { handleZoomWebhook } = require('./src/zoomWebhookHandler');

const app = express();
const port = process.env.PORT || 4000;
const customEndpoint = process.env.CUSTOM_ENDPOINT_URL || '/openai';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('OK');
});

app.post(customEndpoint, (req, res) => {
  handleZoomWebhook(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Listening for events on endpoint: ${customEndpoint}`);
});