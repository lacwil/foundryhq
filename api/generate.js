import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4" if your key supports it
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.data.choices[0]?.message?.content;

    return res.status(200).json({ result: reply });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to generate response." });
  }
}
