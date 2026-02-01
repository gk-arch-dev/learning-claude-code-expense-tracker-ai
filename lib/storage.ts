import { Expense } from './types';
import { STORAGE_KEY } from './constants';

export const loadExpenses = (): Expense[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const expenses = JSON.parse(stored);
    return Array.isArray(expenses) ? expenses : [];
  } catch (error) {
    console.error('Error loading expenses from localStorage:', error);
    return [];
  }
};

export const saveExpenses = (expenses: Expense[]): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses to localStorage:', error);
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please delete some expenses.');
    }
  }
};

export const clearExpenses = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing expenses from localStorage:', error);
  }
};
