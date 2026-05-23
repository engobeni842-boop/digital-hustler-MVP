import { ReactNode } from 'react';
import { useSubscription } from '../context/SubscriptionContext';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { user, hasAccess } = useSubscription();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-500">DIGITAL HUSTLER</h1>

        <div className="text-sm text-slate-300">
          {hasAccess ? 'Access Active' : 'Subscription Required'} •{' '}
          {user.country}
        </div>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
