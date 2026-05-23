import { useState } from 'react';

import { Shield, Sparkles, ArrowRight } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function LoginScreen({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const { login } = useAuth();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  function handleStart() {
    if (!name || !email) return;

    login({
      name,
      email,
      plan: 'trial',
      credits: 100,
    });

    onContinue();
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-purple-600 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-center mb-3">
          DIGITAL HUSTLER
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Powered by ARMOROO ENT
          <br />
          Emmanuel & Thando
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-4 outline-none"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-4 outline-none"
          />

          <button
            onClick={handleStart}
            className="w-full h-14 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all font-bold flex items-center justify-center gap-2"
          >
            Activate 30-Day Trial
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 bg-slate-800 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-green-400" />

            <span className="font-bold">AI Security Active</span>
          </div>

          <p className="text-sm text-slate-400">
            Future protected login, premium verification, and AI onboarding
            system.
          </p>
        </div>
      </div>
    </div>
  );
}
