export interface User {
  id: string;
  email: string;
  country: string;
  subscribed: boolean;
  trialActive: boolean;
  trialEndsAt?: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  sponsored: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
}
