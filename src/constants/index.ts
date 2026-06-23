export const COLORS = {
  primary: '#4F46E5',
  background: '#F8FAFC',
  card: '#FFFFFF',
  income: '#059669',
  expense: '#DC2626',
  warning: '#D97706',
  text: '#0F172A',
  muted: '#94A3B8',
} as const;

export const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Health',
  'Entertainment',
  'Other',
] as const;

export const INCOME_SOURCES = [
  'Salary',
  'Freelance',
  'Business',
  'Investment',
  'Other',
] as const;

export const FREQUENCIES = ['daily', 'weekly', 'monthly', 'yearly'] as const;