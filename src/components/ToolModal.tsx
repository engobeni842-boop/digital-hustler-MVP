import { useState } from 'react';
import { Crown, Lock, Sparkles, Loader2 } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  credits: number;
  premium?: boolean;
}

interface ToolModalProps {
  tool: Tool | null;
  credits: number;
  videoDuration: number;
  setVideoDuration: (value: number) => void;
  onClose: () => void;
  onCreditsChange: (credits: number) => void;
}

export default function ToolModal({
  tool,
  credits,
  videoDuration,
  setVideoDuration,
  onClose,
  onCreditsChange,
}: ToolModalProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  if (!tool) return null;

  function handleGenerate() {
    if (credits < tool.credits) {
      alert('Not enough credits.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      onCreditsChange(credits - tool.credits);

      setVideoDuration(videoDuration + 10);

      setResult(`
✅ ${tool.name} completed successfully.

Prompt:
"${prompt}"

Powered by ARMOROO ENT

Founders:
Emmanuel & Thando

Credits Used:
${tool.credits}
      `);
    }, 2500);
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 relative">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black text-white">{tool.name}</h2>

            <p className="text-purple-400">{tool.category}</p>
          </div>

          {tool.premium && (
            <div className="bg-yellow-500/10 border border-yellow-500 rounded-xl px-3 py-2 flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-400" />

              <span className="text-yellow-300 text-xs font-bold">PREMIUM</span>
            </div>
          )}
        </div>

        {/* SECURITY */}
        <div className="bg-purple-500/10 border border-purple-500 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-purple-400" />

            <h3 className="text-white font-bold">Protected AI Session</h3>
          </div>

          <p className="text-slate-300 text-sm">Premium AI security enabled.</p>
        </div>

        {/* PROMPT */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Enter your prompt for ${tool.name}...`}
          className="w-full h-40 bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none resize-none"
        />

        {/* STATUS */}
        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="text-sm text-slate-400">
            Credits:
            <span className="text-green-400 font-bold ml-2">{credits}</span>
          </div>

          <div className="text-sm text-slate-400">
            Cost:
            <span className="text-purple-400 font-bold ml-2">
              {tool.credits}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || loading}
          className="w-full h-14 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition-all font-black flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate AI Result
            </>
          )}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-slate-950 border border-slate-800 rounded-2xl p-4 whitespace-pre-wrap text-slate-300 text-sm">
            {result}
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            Powered by ARMOROO ENT • Emmanuel & Thando
          </p>
        </div>
      </div>
    </div>
  );
}
