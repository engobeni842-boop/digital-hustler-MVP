import { useState } from "react";

type ToolModalProps = {
  title: string;
  onClose: () => void;
};

export default function ToolModal({ title, onClose }: ToolModalProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("AI result will appear here.");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function generateResult() {
    if (!input.trim()) {
      setResult("Type something first, then press Generate Result.");
      return;
    }

    setCopied(false);
    setIsLoading(true);
    setResult("Connecting to Groq AI...");

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
              content:
                "You are The Digital Hustler AI. Give practical, short, useful digital money, content, creator, and online business advice. No fluff.",
            },
            {
              role: "user",
              content: `${title}: ${input}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });
      const data = await response.json();
      console.log(data);
      const aiText =
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
      "No AI response received.";

      setResult(aiText);
    } catch (error) {
      setResult("AI connection failed. Check your Groq API key and try again.");
    }

    setIsLoading(false);
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setCopied(true);
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black">{title}</h2>

          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl"
          >
            Close
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 bg-black border border-slate-800 rounded-2xl p-4 outline-none text-white"
          placeholder="Type what you want this AI tool to help you with..."
        />

        <button
          onClick={generateResult}
          disabled={isLoading}
          className="mt-5 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 rounded-xl py-3 font-bold"
        >
          {isLoading ? "Thinking with Groq AI..." : "Generate Result"}
        </button>

        <div className="mt-5 bg-black border border-slate-800 rounded-2xl p-4 text-slate-300 whitespace-pre-line min-h-[120px]">
          {result}
        </div>

        <button
          onClick={copyResult}
          className="mt-3 w-full bg-slate-800 hover:bg-slate-700 rounded-xl py-3 font-bold"
        >
          {copied ? "Copied ✅" : "Copy Result"}
        </button>
      </div>
    </div>
  );
}