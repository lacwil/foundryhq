import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4" if your key supports it
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = completion.data.choices[0].message.content;
    res.status(200).json({ result: responseText });
  } catch (error) {
    console.error("OpenAI error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate response" });
  }
}
