import { useState } from "react";
import SideBar from "./components/SideBar";
import ToolCard from "./components/ToolCard";
import ToolModal from "./components/ToolModal";

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <SideBar />

      <main className="flex-1 p-6">
        <h1 className="text-5xl font-black mb-6">
          THE DIGITAL HUSTLER
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-500 text-sm mb-2">ACTIVE PLAN</p>
            <h2 className="text-3xl font-black text-purple-400">MVP TRIAL</h2>
            <p className="text-slate-400 mt-3">Premium AI systems enabled.</p>
          </div>

          <div className="bg-slate-950 border border-green-500 rounded-2xl p-5">
            <p className="text-green-400 text-sm mb-2">AI SECURITY ACTIVE</p>
            <p className="text-slate-300">
              Protected premium tools and monetization systems running.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-black mb-6">AI MONEY ENGINE</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <ToolCard
              title="AI Content Generator"
              description="Generate captions, posts, product ideas, and digital content instantly."
              onOpen={() => setActiveTool("AI Content Generator")}
            />

            <ToolCard
              title="Affiliate Money Tools"
              description="Find affiliate products, earning systems, and monetization opportunities."
              onOpen={() => setActiveTool("Affiliate Money Tools")}
            />

            <ToolCard
              title="Creator Dashboard"
              description="Manage creator systems, uploads, audience growth, and AI assistance."
              onOpen={() => setActiveTool("Creator Dashboard")}
            />

            <ToolCard
              title="AI Hustle Ideas"
              description="Discover trending online money methods and digital hustle systems."
              onOpen={() => setActiveTool("AI Hustle Ideas")}
            />

            <ToolCard
              title="Premium AI Vault"
              description="Access locked premium AI tools and business utilities."
              onOpen={() => setActiveTool("Premium AI Vault")}
            />

            <ToolCard
              title="Security Watch"
              description="Monitor AI systems, sessions, account protection, and usage alerts."
              onOpen={() => setActiveTool("Security Watch")}
            />
          </div>
        </div>
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