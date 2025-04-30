const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Vercel Serverless Function Handler
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST requests are allowed' });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = completion.data.choices[0].message.content.trim();
    res.status(200).json({ result: reply });
  } catch (err) {
    console.error('OpenAI error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to connect to OpenAI' });
  }
};
