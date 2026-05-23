export const subscriptionPlans = [
  {
    id: 'trial',
    name: 'Trial',
    price: 'R0',
    duration: '30 Days SA',
    credits: 100,
    features: [
      'Basic AI tools',
      'Starter credits',
      'Search system',
      'Limited premium access',
    ],
  },

  {
    id: 'premium',
    name: 'Premium Hustler',
    price: 'R160',
    duration: 'Monthly',
    credits: 1000,
    features: [
      'All premium AI tools',
      'Trending scanner',
      'Security Watch',
      'Priority features',
      'Future AI Voice Guide',
      'Higher limits',
    ],
  },
];

export function getPlanById(id: string) {
  return subscriptionPlans.find((plan) => plan.id === id);
}
