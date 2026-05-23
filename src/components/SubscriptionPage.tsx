import { CheckCircle, Crown, Zap, ShieldCheck } from 'lucide-react';
import type { UserPlan } from '../data/tools';

interface SubscriptionPageProps {
  plan: UserPlan;
  credits: number;
  onUpgrade: () => void;
}

export default function SubscriptionPage({
  plan,
  credits,
  onUpgrade,
}: SubscriptionPageProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-purple-700 rounded-2xl p-6">
        <p className="text-purple-400 text-sm font-bold mb-2">
          Subscription System
        </p>

        <h2 className="text-3xl font-black text-white mb-3">
          Upgrade Your Digital Hustler Access
        </h2>

        <p className="text-slate-300 max-w-2xl">
          Unlock premium AI tools, trending scanners, sponsored opportunities,
          higher credit limits, and future app narrator features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-7 h-7 text-purple-400" />
            <h3 className="text-2xl font-black">Trial Access</h3>
          </div>

          <p className="text-slate-400 mb-4">Current starter access.</p>

          <h4 className="text-4xl font-black mb-1">R0</h4>
          <p className="text-slate-400 mb-6">30 days for South Africa</p>

          <ul className="space-y-3 mb-6">
            <PlanItem text="Basic AI tools" />
            <PlanItem text="100 starter credits" />
            <PlanItem text="Search and categories" />
            <PlanItem text="Limited premium tools" />
          </ul>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <p className="text-sm text-slate-400">Current Plan</p>
            <p className="text-xl font-bold capitalize">{plan}</p>
            <p className="text-sm text-slate-400 mt-2">Credits: {credits}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-purple-600 rounded-2xl p-6 shadow-lg shadow-purple-500/10">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-7 h-7 text-purple-400" />
            <h3 className="text-2xl font-black">Premium Hustler</h3>
          </div>

          <p className="text-slate-400 mb-4">
            Best for users who want full access.
          </p>

          <h4 className="text-4xl font-black mb-1">R160</h4>
          <p className="text-slate-400 mb-6">per month after trial</p>

          <ul className="space-y-3 mb-6">
            <PlanItem text="Unlock all premium AI tools" />
            <PlanItem text="Trending Scanner access" />
            <PlanItem text="Security Watch access" />
            <PlanItem text="Higher credit limits" />
            <PlanItem text="Future AI Voice Guide access" />
            <PlanItem text="Priority monetization features" />
          </ul>

          <button
            onClick={onUpgrade}
            className="w-full bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-black"
          >
            {plan === 'premium' ? 'Premium Active' : 'Demo Upgrade'}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-black">Future Security Logic</h3>
        </div>

        <p className="text-slate-300">
          Later, this section will connect to real login, payments, location
          trial rules, subscription verification, and protected premium tools.
        </p>
      </div>
    </div>
  );
}

function PlanItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-slate-300">
      <CheckCircle className="w-5 h-5 text-green-400" />
      <span>{text}</span>
    </li>
  );
}
