import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT || 3000);
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "nova-ai-backend" });
});

app.post("/chat", async (req, res) => {
  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    if (!messages.length) return res.status(400).json({ error: "messages is required" });

    const input = messages.slice(-30).map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.text ?? m.content ?? "")
    })).filter(m => m.content.trim());

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6-luna",
      instructions:
        "Bạn là Nova AI, một trợ lý thân thiện. Trả lời rõ ràng, hữu ích và trung thực. " +
        "Không hướng dẫn hoặc tạo điều kiện cho hành vi nguy hiểm hay trái pháp luật. " +
        "Nếu không biết, nói rõ thay vì bịa.",
      input
    });

    res.json({ output_text: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Nova AI backend listening on port ${port}`);
});
