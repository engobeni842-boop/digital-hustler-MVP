import { useEffect, useState } from 'react';

type Plan = 'trial' | 'premium';

type Tool = {
  id: string;
  name: string;
  category: string;
  description: string;
  credits: number;
  premium?: boolean;
};

const tools: Tool[] = [
  {
    id: 'writer',
    name: 'AI Writer',
    category: 'Writing',
    description: 'Create captions, blogs, ads, emails, and content ideas.',
    credits: 1,
  },
  {
    id: 'image',
    name: 'Image Generator',
    category: 'Visual',
    description: 'Create mockup ideas, poster prompts, and design concepts.',
    credits: 1,
  },
  {
    id: 'video',
    name: 'Video Creator',
    category: 'Video',
    description: 'Create TikTok/Reels scripts, hooks, and short video ideas.',
    credits: 5,
    premium: true,
  },
  {
    id: 'business',
    name: 'Business Planner',
    category: 'Business',
    description: 'Create business plans, monetization ideas, and launch steps.',
    credits: 1,
  },
  {
    id: 'music',
    name: 'Music Composer',
    category: 'Audio',
    description: 'Create hooks, lyrics, song concepts, and rollout ideas.',
    credits: 1,
  },
  {
    id: 'code',
    name: 'Code Assistant',
    category: 'Development',
    description: 'Explain, fix, and generate beginner-friendly code.',
    credits: 1,
  },
];

export default function App() {
  const [page, setPage] = useState<
    'splash' | 'login' | 'welcome' | 'dashboard' | 'terms'
  >('splash');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [credits, setCredits] = useState(100);
  const [plan, setPlan] = useState<Plan>('trial');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('digital_hustler_session');

      if (saved) {
        const session = JSON.parse(saved);
        setName(session.name || '');
        setEmail(session.email || '');
        setCredits(session.credits ?? 100);
        setPlan(session.plan || 'trial');
        setPage('dashboard');
      } else {
        setPage('login');
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!name || !email) return;
    localStorage.setItem(
      'digital_hustler_session',
      JSON.stringify({ name, email, credits, plan })
    );
  }, [name, email, credits, plan]);

  function activateTrial() {
    if (!name.trim() || !email.trim()) {
      alert('Enter name and email first.');
      return;
    }

    setCredits(100);
    setPlan('trial');
    setPage('welcome');
  }

  function logout() {
    localStorage.removeItem('digital_hustler_session');
    setName('');
    setEmail('');
    setCredits(100);
    setPlan('trial');
    setSelectedTool(null);
    setPage('login');
  }

  function openTool(tool: Tool) {
    if (tool.premium && plan !== 'premium') {
      alert('Premium locked. Upgrade first.');
      return;
    }

    setSelectedTool(tool);
    setPrompt('');
    setResult('');
  }

  function generateResult() {
    if (!selectedTool || !prompt.trim()) return;

    if (credits < selectedTool.credits) {
      alert('Not enough credits.');
      return;
    }

    setCredits((prev) => Math.max(0, prev - selectedTool.credits));

    setResult(`✅ ${selectedTool.name} completed successfully.

Prompt:
"${prompt}"

AI Guide:
This is a demo AI output. Real AI API connection will be added after MVP testing.

Powered by ARMOROO ENT
Emmanuel & Thando

Credits used:
${selectedTool.credits}`);
  }

  if (page === 'splash') {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-5xl shadow-2xl shadow-purple-700/40 animate-pulse">
            ✨
          </div>

          <p className="text-purple-400 font-bold tracking-[0.3em] text-sm mb-3">
            ARMOROO ENT
          </p>

          <h1 className="text-5xl md:text-7xl font-black mb-3">
            THE DIGITAL HUSTLER
          </h1>

          <p className="text-slate-400 font-bold tracking-widest">
            AI MONEY ENGINE
          </p>

          <div className="mt-8 w-48 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full w-2/3 bg-purple-600 rounded-full animate-pulse" />
          </div>

          <p className="text-slate-600 text-sm mt-6">
            Loading premium systems...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {page === 'login' && (
        <section className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl">
                ✨
              </div>

              <span className="inline-block mb-3 bg-green-500/10 border border-green-500 text-green-400 text-xs px-3 py-1 rounded-full font-bold">
                MVP v1.0
              </span>

              <h1 className="text-4xl font-black">DIGITAL HUSTLER</h1>

              <p className="text-slate-400 mt-2">
                Powered by ARMOROO ENT
                <br />
                Emmanuel & Thando
              </p>
            </div>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full mb-4 p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mb-4 p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none"
            />

            <button
              onClick={activateTrial}
              className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl p-4 font-bold"
            >
              Activate 30-Day Trial
            </button>
          </div>
        </section>
      )}

      {page === 'welcome' && (
        <section className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-3xl text-center bg-slate-900 border border-slate-800 rounded-3xl p-10">
            <h1 className="text-5xl font-black mb-4">
              Welcome to{' '}
              <span className="text-purple-500">The Digital Hustler</span>
            </h1>

            <p className="text-slate-400 mb-8">
              Your 30-day South African trial is active. AI Guide is active for
              instructions and safety.
            </p>

            <button
              onClick={() => setPage('dashboard')}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-bold"
            >
              Enter Dashboard
            </button>
          </div>
        </section>
      )}

      {page === 'dashboard' && (
        <section className="p-6 max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-purple-500 font-black">DIGITAL HUSTLER</h1>
              <p className="text-xs text-slate-500">
                ARMOROO ENT • Emmanuel & Thando • MVP v1.0
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPage('terms')}
                className="bg-slate-800 px-4 py-2 rounded-xl text-sm"
              >
                Terms
              </button>
              <button
                onClick={logout}
                className="bg-slate-800 px-4 py-2 rounded-xl text-sm"
              >
                Logout
              </button>
            </div>
          </header>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-purple-400 font-bold mb-2">
              30-Day SA Trial Active
            </p>
            <h2 className="text-5xl font-black mb-3">THE DIGITAL HUSTLER</h2>
            <p className="text-slate-400">
              Welcome, {name}. Your session is saved. AI tools, premium systems,
              security notices, narrator guide, and demo generator are ready.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card title="Trial" value="30 Days SA" />
            <Card title="Credits" value={String(credits)} />
            <Card title="Plan" value={plan} />
            <Card title="Tools" value={String(tools.length)} />
          </div>

          <div className="bg-green-500/10 border border-green-500 rounded-2xl p-5">
            <h3 className="font-black text-green-400 mb-2">
              AI Security Active
            </h3>
            <p className="text-slate-300 text-sm">
              Protected premium tools, saved session, credit checks, logout,
              demo disclaimer, and safe usage notices are active.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500 rounded-2xl p-5">
            <h3 className="font-black text-purple-300 mb-2">
              AI Guide / Narrator
            </h3>
            <p className="text-slate-300 text-sm">
              Welcome to The Digital Hustler. Choose a tool, type your request,
              and generate your result. Voice narration will be added later
              after MVP testing.
            </p>
          </div>

          <button
            onClick={() => setPlan('premium')}
            className="bg-yellow-500 text-black px-5 py-3 rounded-xl font-bold"
          >
            {plan === 'premium' ? 'Premium Active' : 'Demo Upgrade to Premium'}
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black">{tool.name}</h3>
                    <p className="text-purple-400 text-sm mb-4">
                      {tool.category}
                    </p>
                  </div>

                  {tool.premium && (
                    <span className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-full h-fit font-bold">
                      PREMIUM
                    </span>
                  )}
                </div>

                <p className="text-slate-400 mb-6">{tool.description}</p>

                <button
                  onClick={() => openTool(tool)}
                  className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-bold"
                >
                  {tool.premium && plan !== 'premium'
                    ? 'Premium Locked'
                    : 'Open Tool'}
                </button>
              </div>
            ))}
          </div>

          <footer className="text-center text-slate-600 text-sm pt-8">
            THE DIGITAL HUSTLER • ARMOROO ENT • Emmanuel & Thando • AI MONEY
            ENGINE
          </footer>
        </section>
      )}

      {page === 'terms' && (
        <section className="p-6 max-w-4xl mx-auto space-y-6">
          <button
            onClick={() => setPage('dashboard')}
            className="bg-slate-800 px-4 py-2 rounded-xl"
          >
            ← Back
          </button>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
            <h1 className="text-4xl font-black">Terms, Privacy & Disclaimer</h1>
            <p className="text-slate-400">
              This MVP is a demo app by ARMOROO ENT, Emmanuel & Thando.
            </p>
            <p className="text-slate-300">
              AI outputs are demo-generated and should be reviewed before use.
            </p>
            <p className="text-slate-300">
              Credits, premium upgrades, and trial access are currently
              prototype logic only.
            </p>
            <p className="text-slate-300">
              Do not enter sensitive personal, banking, password, or private
              account information into demo prompts.
            </p>
          </div>
        </section>
      )}

      {selectedTool && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-xl">
            <button
              onClick={() => setSelectedTool(null)}
              className="float-right text-slate-400"
            >
              ✕
            </button>

            <h2 className="text-3xl font-black mb-2">{selectedTool.name}</h2>
            <p className="text-slate-400 mb-4">
              Cost: {selectedTool.credits} credit
            </p>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full h-36 bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none mb-4"
            />

            <button
              onClick={generateResult}
              className="w-full bg-purple-600 hover:bg-purple-700 p-4 rounded-xl font-bold"
            >
              Generate
            </button>

            {result && (
              <pre className="mt-4 bg-black p-4 rounded-xl whitespace-pre-wrap text-sm">
                {result}
              </pre>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <p className="text-slate-500 text-sm">{title}</p>
      <h3 className="text-2xl font-black capitalize">{value}</h3>
    </div>
  );
}
