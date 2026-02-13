import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint اختبار السيرفر
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/chat", async (req, res) => {
  const { character, message } = req.body;

  const characters = {
    friend: "أنت صديق بتتكلم مصري وهزارك خفيف",
    doctor: "أنت دكتور عام، بتدي نصايح عامة بس"
  };

  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// استخدم Port من Environment Variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
