import { useState } from "react";

type ToolModalProps = {
  title: string;
  onClose: () => void;
};

export default function ToolModal({ title, onClose }: ToolModalProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("Your AI response will appear here...");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function getSystemPrompt() {
    if (title === "AI Content Generator") {
      return "You are The Digital Hustler AI Content Generator. Create short, powerful captions, hooks, TikTok scripts, posts, product descriptions, and content ideas. Make results practical, viral-friendly, modern, and no fluff.";
    }

    if (title === "Affiliate Money Tools") {
      return "You are The Digital Hustler Affiliate Money Assistant. Give affiliate product angles, promotion ideas, content strategies, beginner monetization steps, and realistic ways to earn online. No fake promises. No fluff.";
    }

    if (title === "Business Idea Builder") {
      return "You are The Digital Hustler Business Idea Builder. Give realistic online business ideas, startup steps, monetization paths, and beginner-friendly action plans. Keep it simple, practical, and no fluff.";
    }

    return "You are The Digital Hustler AI. Give practical, short, useful digital money, content, creator, and online business advice. No fluff.";
  }

  async function generateResult() {
    if (!input.trim()) {
      setResult("Type something first before generating a result.");
      return;
    }

    setCopied(false);
    setIsLoading(true);
    setResult("The Digital Hustler AI is thinking...");

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: getSystemPrompt(),
            },
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 0.75,
          max_tokens: 450,
        }),
      });

      const data = await response.json();

      const aiText =
        data?.choices?.[0]?.message?.content ||
        data?.error?.message ||
        "No AI response received.";

      setResult(aiText);
    } catch {
      setResult("AI connection failed. Check your Groq API key and try again.");
    }

    setIsLoading(false);
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setCopied(true);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-950 border border-purple-900/50 rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-purple-400 text-sm font-bold uppercase tracking-widest">
              AI Tool Active
            </p>
            <h2 className="text-3xl font-black text-white mt-1">{title}</h2>
            <p className="text-slate-400 text-sm mt-2">
              Premium AI assistance for digital hustlers.
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl text-white"
          >
            Close
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask this AI tool what you need..."
          className="w-full h-44 bg-black border border-slate-800 rounded-2xl p-5 text-white outline-none resize-none focus:border-purple-500"
        />

        <button
          onClick={generateResult}
          disabled={isLoading}
          className="mt-5 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 rounded-2xl py-4 font-black text-white"
        >
          {isLoading ? "Generating AI Response..." : "Generate Result"}
        </button>

        <div className="mt-5 bg-black border border-slate-800 rounded-2xl p-5 min-h-[180px] max-h-[320px] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-purple-400 font-bold">AI Response</h3>
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          <p className="text-slate-200 whitespace-pre-line leading-7">
            {result}
          </p>
        </div>

        <button
          onClick={copyResult}
          className="mt-4 w-full bg-slate-800 hover:bg-slate-700 rounded-2xl py-4 font-bold text-white"
        >
          {copied ? "Copied Successfully ✅" : "Copy Result"}
        </button>
      </div>
    </div>
  );
}