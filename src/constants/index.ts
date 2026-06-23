export { Colors } from './colors';
export { Strings } from './strings';

export const CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other',
] as const;

export const INCOME_SOURCES = [
  'Salary', 'Freelance', 'Business', 'Investment', 'Other',
] as const;

export const FREQUENCIES = ['daily', 'weekly', 'monthly', 'yearly'] as const;