import { Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

interface WelcomePageProps {
  onEnterDashboard: () => void;
}

export default function WelcomePage({ onEnterDashboard }: WelcomePageProps) {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 md:p-16 text-center">
        <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
          Welcome to
          <span className="text-purple-500"> The Digital Hustler</span>
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
          AI tools, creator systems, monetization ideas, and digital hustle
          resources powered by ARMOROO ENT.
        </p>

        <button
          onClick={onEnterDashboard}
          className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2 transition"
        >
          Enter Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={<Zap className="w-8 h-8 text-green-400" />}
          title="Fast AI Tools"
          text="Generate ideas, content, visuals, and business systems instantly."
        />

        <FeatureCard
          icon={<Shield className="w-8 h-8 text-blue-400" />}
          title="Security Systems"
          text="Protected onboarding, premium verification, and AI safety systems."
        />

        <FeatureCard
          icon={<Sparkles className="w-8 h-8 text-purple-400" />}
          title="Creator Ecosystem"
          text="Built for hustlers, creators, artists, brands, and entrepreneurs."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="mb-4">{icon}</div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>

      <p className="text-slate-400">{text}</p>
    </div>
  );
}
