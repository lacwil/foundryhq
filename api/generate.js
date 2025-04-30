import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  console.log("👉 Request received at /api/generate");

  if (req.method !== "POST") {
    console.log("❌ Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    console.log("❌ No prompt received in body.");
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    console.log("⚙️ Sending prompt to OpenAI:", prompt);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.data.choices[0]?.message?.content || "No reply from OpenAI.";

    console.log("✅ OpenAI returned:", reply);

    res.status(200).json({ result: reply });
  } catch (error) {
    console.error("❌ Error from OpenAI:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate response from OpenAI" });
  }
}
