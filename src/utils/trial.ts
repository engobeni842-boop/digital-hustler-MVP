export function getTrialDays(country: string): number {
  if (country.toLowerCase() === 'south africa') {
    return 30;
  }

  return 3;
}

export function calculateTrialEnd(country: string): string {
  const days = getTrialDays(country);

  const end = new Date();
  end.setDate(end.getDate() + days);

  return end.toISOString();
}

export function isTrialActive(trialEndsAt?: string): boolean {
  if (!trialEndsAt) return false;

  return new Date(trialEndsAt) > new Date();
}
