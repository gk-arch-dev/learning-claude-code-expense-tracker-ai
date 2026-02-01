import { CategoryType } from './types';

export const CATEGORIES: CategoryType[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export const CATEGORY_COLORS: Record<CategoryType, string> = {
  Food: '#10b981',
  Transportation: '#3b82f6',
  Entertainment: '#ec4899',
  Shopping: '#f59e0b',
  Bills: '#ef4444',
  Other: '#6b7280',
};

export const CATEGORY_BG_COLORS: Record<CategoryType, string> = {
  Food: 'bg-green-500',
  Transportation: 'bg-blue-500',
  Entertainment: 'bg-pink-500',
  Shopping: 'bg-amber-500',
  Bills: 'bg-red-500',
  Other: 'bg-gray-500',
};

export const CATEGORY_TEXT_COLORS: Record<CategoryType, string> = {
  Food: 'text-green-600',
  Transportation: 'text-blue-600',
  Entertainment: 'text-pink-600',
  Shopping: 'text-amber-600',
  Bills: 'text-red-600',
  Other: 'text-gray-600',
};

export const STORAGE_KEY = 'expense-tracker-expenses';
