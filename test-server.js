const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const result = completion.choices[0].message.content.trim();
    res.status(200).json({ result });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to connect to OpenAI' });
  }
});

app.listen(port, () => {
  console.log(`✅ Local test server running at http://localhost:${port}/api/generate`);
});
