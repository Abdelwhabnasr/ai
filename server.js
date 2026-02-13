import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  const { character, message } = req.body;

  const characters = {
    friend: "أنت صديق بتتكلم مصري وهزارك خفيف",
    doctor: "أنت دكتور عام، بتدي نصايح عامة بس"
  };

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: characters[character] },
      { role: "user", content: message }
    ]
  });

  res.json({
    reply: completion.choices[0].message.content
  });
});

app.listen(3000, () => console.log("Server running"));

