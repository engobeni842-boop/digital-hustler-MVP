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
    const prompts: Record<string, string> = {
      "AI Content Generator":
        "Create captions, hooks, posts, content ideas, product posts, and short scripts. Make it modern, viral-friendly, practical, and no fluff.",

      "TikTok Script Writer":
        "Create short TikTok/Reels scripts with a strong hook, simple scene direction, caption, hashtags, and call-to-action. Keep it punchy and viral-friendly.",

      "Affiliate Money Tools":
        "Give realistic affiliate marketing ideas, product angles, platforms, promotion strategies, content ideas, and beginner steps. No fake income promises.",

      "AI Hustle Ideas":
        "Give realistic online hustle ideas using AI, content, digital products, freelancing, affiliate marketing, or print-on-demand. Include steps and monetization.",

      "Business Idea Builder":
        "Turn ideas into simple business plans. Include target audience, offer, pricing idea, tools needed, first 3 steps, and monetization path.",

      "Brand Name Generator":
        "Generate premium brand names, slogans, positioning ideas, brand vibe, audience, and simple launch direction.",

      "Product Description Writer":
        "Write clean product descriptions for clothing, digital products, ebooks, services, templates, and online stores. Make it persuasive but not fake.",

      "Marketing Assistant":
        "Create ads, launch plans, audience angles, sales hooks, content plans, and campaign ideas. Keep it practical and direct.",

      "YouTube Idea Generator":
        "Create YouTube video ideas, titles, descriptions, thumbnail concepts, hooks, and channel growth ideas.",

      "Hashtag Generator":
        "Generate relevant hashtags for TikTok, Instagram, YouTube Shorts, brands, creators, music, clothing, and digital products.",

      "Prompt Enhancer":
        "Rewrite weak prompts into powerful AI prompts. Give improved prompt, why it works, and optional advanced version.",

      "Digital Product Builder":
        "Help build ebooks, PDFs, templates, guides, mini-courses, checklists, and Gumroad-style products. Include structure, title ideas, and selling angle.",

      "Creator Dashboard":
        "Help creators plan daily content, uploads, brand growth, audience strategy, and monetization tasks.",

      "Premium AI Vault":
        "Give premium-level online business systems, digital product ideas, automation ideas, monetization frameworks, and growth strategies.",

      "Security Watch":
        "Give account safety, app safety, AI tool safety, scam warnings, privacy tips, and beginner-friendly security advice.",
    };

    return `You are The Digital Hustler AI. ${prompts[title] || "Give practical digital money, creator, business, and AI tool advice."} No fluff. Be clear, useful, and action-focused.`;
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
            { role: "system", content: getSystemPrompt() },
            { role: "user", content: input },
          ],
          temperature: 0.75,
          max_tokens: 650,
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