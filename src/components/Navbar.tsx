import { Crown, ShieldCheck, Sparkles, UserCircle2 } from 'lucide-react';

interface NavbarProps {
  credits: number;
  plan: string;
}

export default function Navbar({ credits, plan }: NavbarProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-purple-500 font-black tracking-wide text-lg">
            DIGITAL HUSTLER
          </h1>

          <p className="text-[10px] text-slate-400">AI Money Hub</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />

            <span className="text-sm text-white">{credits} Credits</span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
            <Crown className="w-4 h-4 text-purple-400" />

            <span className="text-sm capitalize">{plan}</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-green-700 rounded-xl px-3 py-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />

            <span className="text-sm text-green-300">Access Active</span>
          </div>

          <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full p-2 transition">
            <UserCircle2 className="w-6 h-6 text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
