import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are a wise, highly compassionate, and polite AI Islamic Scholar and Educational Companion. Your mission is to assist users in studying Islam, learning Arabic letters, practicing Tajweed rules, understanding Quranic verses, and reviewing historical accounts of Islamic civilization.
Guidelines:
1. Ground your text in the Holy Quran and authentic Hadiths (Sahih Bukhari, Sahih Muslim, etc.) with specific chapter (Surah) and verse references (e.g. Surah Al-Baqarah 2:255).
2. If asked legal rulings, dietary status of intricate chemicals, or specific legal questions (Fatwas), always state clearly that you are an academic/educational assistant, and guide them to consult a qualified local Imam or scholar for final guidance.
3. Keep your language warm, encouraging, respectful, peaceful, and universally approachable.
4. Format your advice elegantly with clear Markdown headers, tables, lists, and quote blocks. Avoid self-praise or verbose preambles.`;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === "YOUR_GROQ_API_KEY") {
      return res.json({
        content: `Peace be upon you! I am currently running in **Offline Educational Demonstration Mode** because a valid \`GROQ_API_KEY\` is not configured.

To enable live conversational learning, get a free API key at [console.groq.com](https://console.groq.com) and add it to your \`.env\` file.

---

### **Learning Lesson of the Day**
*"The upper hand is better than the lower hand (i.e. he who gives is better than he who takes/begs)..."* (Sahih al-Bukhari 1429)

**Three educational insights about Hadith science:**
1. **Sanad (Chain of Narrators)**: The sequence of scholars who passed the statement down.
2. **Matn (The Text)**: The actual content, instruction, or wisdom of the Prophet (ﷺ).
3. **Authenticity**: Hadith collections compiled by Imam Bukhari and Imam Muslim represent the highest rigorous standard (Sahih).

Feel free to ask anything else! Once the API key is configured, I can provide deep Quranic explanations, Arabic root lessons, and moral storytelling.`,
      });
    }

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "model" ? "assistant" : m.role,
        content: m.content,
      })),
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || "I was unable to retrieve a response. Please rephrase or try again.";
    return res.json({ content: replyText });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({ error: error.message || "An error occurred during conversational retrieval." });
  }
});

async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with Static Assets serving...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`====================================================`);
    console.log(` Islamic Learning App running on http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

setupServer().catch((err) => {
  console.error("Failed to boot full-stack server:", err);
});
