import { format, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

export const getMonthRange = (date: Date) => ({
  start: startOfMonth(date).toISOString(),
  end: endOfMonth(date).toISOString(),
});

export const getYearRange = (date: Date) => ({
  start: startOfYear(date).toISOString(),
  end: endOfYear(date).toISOString(),
});

export const formatDate = (date: string | Date, pattern = 'MMM dd, yyyy') =>
  format(new Date(date), pattern);