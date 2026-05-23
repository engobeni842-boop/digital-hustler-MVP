import { useState } from "react";
import SideBar from "./components/SideBar";
import ToolCard from "./components/ToolCard";
import ToolModal from "./components/ToolModal";

type Tool = {
  title: string;
  description: string;
  category: string;
  badge: string;
  icon: string;
  premium?: boolean;
};

const aiTools: Tool[] = [
  {
    title: "AI Content Generator",
    description: "Generate captions, hooks, product ideas, and digital content.",
    category: "Content",
    badge: "Popular",
    icon: "✍️",
  },
  {
    title: "TikTok Script Writer",
    description: "Create viral short-form video scripts and hooks.",
    category: "Content",
    badge: "Hot",
    icon: "🎬",
  },
  {
    title: "Affiliate Money Tools",
    description: "Affiliate monetization systems and earning strategies.",
    category: "Money",
    badge: "Money",
    icon: "💰",
  },
  {
    title: "AI Hustle Ideas",
    description: "Trending online money methods and digital hustles.",
    category: "Money",
    badge: "Trending",
    icon: "🚀",
  },
  {
    title: "Business Idea Builder",
    description: "Turn ideas into real business systems.",
    category: "Business",
    badge: "Pro",
    icon: "🏢",
  },
  {
    title: "Brand Name Generator",
    description: "Generate premium brand identities and slogans.",
    category: "Branding",
    badge: "Brand",
    icon: "🔥",
  },
  {
    title: "Prompt Enhancer",
    description: "Upgrade weak prompts into powerful AI prompts.",
    category: "AI",
    badge: "AI",
    icon: "🧠",
  },
  {
    title: "Security Watch",
    description: "Security systems, account protection, and alerts.",
    category: "Security",
    badge: "Safe",
    icon: "🛡️",
  },
  {
    title: "Digital Product Builder",
    description: "Create ebooks, PDFs, templates, and digital products.",
    category: "Products",
    badge: "Build",
    icon: "📦",
  },
  {
    title: "Premium AI Vault",
    description: "Locked premium AI systems and advanced business tools.",
    category: "Premium",
    badge: "PRO",
    icon: "🔒",
    premium: true,
  },
];

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredTools = aiTools.filter((tool) =>
    `${tool.title} ${tool.description} ${tool.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-black min-h-screen text-white">
      <SideBar />

      <main className="flex-1 p-6 overflow-y-auto">
        <section className="mb-8">
          <p className="text-purple-400 font-bold tracking-widest text-sm uppercase">
            AI MONEY PLATFORM
          </p>

          <h1 className="text-5xl font-black mt-2">
            THE DIGITAL HUSTLER
          </h1>

          <p className="text-slate-400 mt-3 max-w-3xl">
            Premium AI toolkit for creators, hustlers, entrepreneurs, and digital builders.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-slate-950 border border-purple-800 rounded-3xl p-5">
            <p className="text-slate-500 text-sm uppercase">Active Plan</p>
            <h2 className="text-3xl font-black text-purple-400 mt-2">
              MVP TRIAL
            </h2>
            <p className="text-slate-400 mt-2">
              Premium systems enabled.
            </p>
          </div>

          <div className="bg-slate-950 border border-green-500 rounded-3xl p-5">
            <p className="text-green-400 text-sm uppercase">AI Status</p>
            <h2 className="text-3xl font-black mt-2">
              ONLINE
            </h2>
            <p className="text-slate-400 mt-2">
              Groq AI running.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5">
            <p className="text-slate-500 text-sm uppercase">Trial Countdown</p>
            <h2 className="text-3xl font-black mt-2">
              27 DAYS
            </h2>
            <p className="text-slate-400 mt-2">
              Remaining trial access.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-purple-900 border border-yellow-500 rounded-3xl p-5">
            <p className="text-yellow-400 text-sm uppercase">
              Upgrade
            </p>

            <h2 className="text-3xl font-black mt-2">
              PRO ACCESS
            </h2>

            <button className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl font-black">
              Upgrade Now
            </button>
          </div>
        </section>

        <section className="mt-8 bg-gradient-to-r from-purple-950/40 to-slate-950 border border-purple-900/40 rounded-3xl p-6">
          <p className="text-purple-400 text-sm font-bold uppercase tracking-widest">
            QUICK ACTIONS
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            {[
              "🎬 TikTok Hook",
              "💰 Affiliate Idea",
              "🔥 Brand Name",
              "📦 Product Idea",
              "🧠 AI Prompt",
            ].map((action) => (
              <button
                key={action}
                className="bg-slate-900 hover:bg-purple-700 transition-all px-4 py-3 rounded-2xl font-bold"
              >
                {action}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-purple-400 font-bold tracking-widest text-sm uppercase">
                Tool Categories
              </p>

              <h2 className="text-3xl font-black mt-1">
                AI MONEY ENGINE
              </h2>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full md:w-80 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-white outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.title}
                className={`relative rounded-3xl ${
                  tool.premium
                    ? "border border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.15)]"
                    : ""
                }`}
              >
                <div className="absolute top-4 right-4 bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs px-3 py-1 rounded-full z-10">
                  {tool.badge}
                </div>

                <div className="absolute top-4 left-4 text-3xl z-10">
                  {tool.icon}
                </div>

                {tool.premium && (
                  <div className="absolute bottom-5 right-5 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-black z-10">
                    PRO
                  </div>
                )}

                <ToolCard
                  title={tool.title}
                  description={`${tool.category} • ${tool.description}`}
                  onOpen={() =>
                    !tool.premium && setActiveTool(tool.title)
                  }
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {activeTool && (
        <ToolModal
          title={activeTool}
          onClose={() => setActiveTool(null)}
        />
      )}
    </div>
  );
}