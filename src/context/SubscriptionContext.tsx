import { createContext, useContext, useState } from 'react';
import { mockUser } from '../data/mockUser';
import { isTrialActive } from '../utils/trial';

const SubscriptionContext = createContext<any>(undefined);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(mockUser);

  const hasAccess = user.subscribed || isTrialActive(user.trialEndsAt);

  function subscribe() {
    setUser({
      ...user,
      subscribed: true,
      trialActive: false,
    });
  }

  return (
    <SubscriptionContext.Provider value={{ user, hasAccess, subscribe }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error('useSubscription must be used inside SubscriptionProvider');
  }

  return context;
}
