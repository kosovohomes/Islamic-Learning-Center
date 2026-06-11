import React, { useState, useEffect, useRef } from "react";
import { Message } from "../types";
import { Send, Sparkles, HelpCircle, ArrowRight, Loader } from "lucide-react";
import Markdown from "react-markdown";

const SUGGESTED_PROMPTS = [
  "Explain the contextual background (Tafseer) of Surah Al-Fatihah.",
  "What is the semantic distinction between 'Nabi' and 'Rasool' in Islam?",
  "Tell me an educational biography of Imam al-Bukhari and his Hadith compiles.",
  "Give me 5 essential Arabic roots vocabulary words for beginner daily prayer study.",
];

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Load welcome dialogue on mount
  useEffect(() => {
    setMessages([
      {
        id: "msg-welcome",
        role: "model",
        content: `Assalamu Alaykum (Peace be upon you)! 🌸 Welcome to the **Arabic and Islamic Knowledge Study Desk**.

I am your AI educational study companion, trained in scholarly sources to assist you in investigating:
1. **Quran Tafseer**: Detailed explanations, historical contexts, and linguistical translations.
2. **Arabic Alphabets & Pronunciation**: Direct guidelines on Tajweed and vocabulary root sciences.
3. **Pillars & Biography**: Insights on Islamic history, the lives of Prophets (ﷺ), and the compilers of Hadiths.

*Please feel free to ask a question below or choose one of our quick study shortcuts!*`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, []);

  // Scroll to bottom on updates
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend || isLoading) return;

    setInput("");
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with the educational AI backend service.");
      }

      const data = await response.json();
      
      const replyMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "model",
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, replyMessage]);
    } catch (e: any) {
      console.error("Chat error:", e);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "model",
          content: `⚠️ **API Communication Error**: ${e.message || "An unexpected error occurred."}
          
Please check that your network matches the dev server and your API keys are correctly defined inside AI Studio Secrets tab!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div id="ai-chat-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[640px]">
      
      {/* Suggestions and tips column */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between hidden lg:flex">
        <div>
          <span className="text-xs font-mono text-slate-400 font-medium mb-3 uppercase tracking-wider block">Recommended Seminars</span>
          <div className="space-y-2">
            {SUGGESTED_PROMPTS.map((promptText, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(promptText)}
                disabled={isLoading}
                className="w-full text-left p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-200 text-xs font-medium text-slate-700 hover:text-emerald-950 transition-all flex items-start gap-2.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-2 leading-snug">{promptText}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-[11px] text-emerald-800 leading-relaxed font-sans mt-4">
          <h4 className="font-semibold mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-emerald-600" />
            Scholarly Guidance Standards
          </h4>
          Answers adhere strictly to authentic compilations. Legal requests will kindly point out academic borders to safeguard religious standards.
        </div>
      </div>

      {/* Main chat window */}
      <div className="lg:col-span-8 bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between h-full">
        {/* Messages feed */}
        <div className="flex-1 overflow-y-auto space-y-4 px-1.5 pb-4">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar icon */}
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border font-mono text-xs font-bold ${
                  isUser
                    ? "bg-slate-100 border-slate-200 text-slate-600"
                    : "bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10"
                }`}>
                  {isUser ? "U" : "🕌"}
                </div>

                <div className="space-y-1">
                  <div className={`px-4 py-3 rounded-2xl text-[12.5px] tracking-tight leading-relaxed transition-all shadow-xs ${
                    isUser
                      ? "bg-slate-900 border border-slate-900 text-white rounded-tr-none"
                      : "bg-slate-50 border border-slate-150 text-slate-900 rounded-tl-none prose prose-slate max-w-none"
                  }`}>
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="markdown-body">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    )}
                  </div>
                  <span className={`text-[9px] font-mono text-slate-400 block ${isUser ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading status */}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-emerald-500 border border-emerald-500 text-slate-950 flex items-center justify-center font-bold font-mono text-xs">
                🕌
              </div>
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-xs">
                <Loader className="w-4 h-4 text-emerald-600 animate-spin" />
                <span className="text-xs font-mono text-slate-500">Consulting scholarly compiles...</span>
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* Suggested Prompts for smaller viewports */}
        <div className="lg:hidden flex gap-2 pb-3 overflow-x-auto select-none no-scrollbar">
          {SUGGESTED_PROMPTS.slice(0, 2).map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              disabled={isLoading}
              className="shrink-0 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] py-1.5 px-3 rounded-full text-slate-600 font-medium transition-all max-w-[190px] truncate cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input form */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your religious or linguistic study query here... (Press Enter to Send)"
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none transition-all disabled:opacity-55 disabled:cursor-not-allowed"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Send Message"
          >
            <Send className="w-4 h-4 fill-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
}
