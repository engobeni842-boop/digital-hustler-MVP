import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type UserPlan = 'trial' | 'premium';

interface User {
  name: string;
  email: string;
  plan: UserPlan;
  credits: number;
}

interface AuthContextType {
  user: User | null;

  login: (userData: User) => void;

  logout: () => void;

  upgradePlan: () => void;

  addCredits: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('digital_hustler_user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(userData: User) {
    setUser(userData);

    localStorage.setItem('digital_hustler_user', JSON.stringify(userData));
  }

  function logout() {
    setUser(null);

    localStorage.removeItem('digital_hustler_user');
  }

  function upgradePlan() {
    if (!user) return;

    const updatedUser = {
      ...user,
      plan: 'premium' as UserPlan,
    };

    setUser(updatedUser);

    localStorage.setItem('digital_hustler_user', JSON.stringify(updatedUser));
  }

  function addCredits(amount: number) {
    if (!user) return;

    const updatedUser = {
      ...user,
      credits: user.credits + amount,
    };

    setUser(updatedUser);

    localStorage.setItem('digital_hustler_user', JSON.stringify(updatedUser));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        upgradePlan,
        addCredits,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
