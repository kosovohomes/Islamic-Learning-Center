import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for JSON parsing
app.use(express.json());

// Lazy-loaded Gemini Client to prevent crash when key is missing at boot time
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("WARNING: GEMINI_API_KEY placeholder or empty value detected. Running AI Tutor in offline fallback mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST APIs
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return beautiful offline mock response with helpful coaching instructions
      return res.json({
        content: `Peace be upon you! I am currently running in **Offline Educational Demonstration Mode** because a valid \`GEMINI_API_KEY\` is not set in this environment. 

To enable my live conversational learning abilities, simply configure your key in **Settings > Secrets** in the AI Studio sidebar.

---

### **Learning Lesson of the Day**
*“The upper hand is better than the lower hand (i.e. he who gives is better than he who takes/begs)...”* (Sahih al-Bukhari 1429)

**Three educational insights about Hadith science:**
1. **Sanad (Chain of Narrators)**: The sequence of scholars who passed the statement down.
2. **Matn (The Text)**: The actual content, instruction, or wisdom of the Prophet (ﷺ).
3. **Authenticity**: Hadith collections compiled by Imam Bukhari and Imam Muslim represent the highest rigorous standard (Sahih).

Feel free to input anything else! If you have the API key connected, I will provide deep Quranic explanations, Arabic roots lessons, and moral storytelling.`,
      });
    }

    // Translate client messages style to Gemini SDK spec
    // [{ role: "user" | "model", parts: [{ text: "..." }] }]
    const contents = messages.map((m) => {
      // Normalize role values to match model/user expectations
      const role = m.role === "assistant" || m.role === "model" ? "model" : "user";
      return {
        role: role,
        parts: [{ text: m.content }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: `You are a wise, highly compassionate, and polite AI Islamic Scholar and Educational Companion. Your mission is to assist users in studying Islam, learning Arabic letters, practicing Tajweed rules, understanding Quranic verses, and reviewing historical accounts of Islamic civilization.
Guidelines:
1. Ground your text in the Holy Quran and authentic Hadiths (Sahih Bukhari, Sahih Muslim, etc.) with specific chapter (Surah) and verse references (e.g. Surah Al-Baqarah 2:255).
2. If asked legal rulings, dietary status of intricate chemicals, or specific legal questions (Fatwas), always state clearly that you are an academic/educational assistant, and guide them to consult a qualified local Imam or scholar for final guidance.
3. Keep your language warm, encouraging, respectful, peaceful, and universally approachable.
4. Format your advice elegantly with clear Markdown headers, tables, lists, and quote blocks. Avoid self-praise or verbose preambles.`,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to retrieve a response. Please rephrase or try again.";
    return res.json({ content: replyText });
  } catch (error: any) {
    console.error("Error in /api/chat Gemini endpoint:", error);
    return res.status(500).json({ error: error.message || "An error occurred during conversational retrieval." });
  }
});

// Configure Vite or Static Asset serving
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
