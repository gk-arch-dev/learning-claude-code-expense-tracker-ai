import { useState, useMemo } from 'react';
import { Expense, ExpenseFormData, CategoryType } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEY } from '../constants';
import { dollarsToCents, generateId } from '../utils';
import { startOfDay, endOfDay, isWithinInterval, parseISO } from 'date-fns';

export function useExpenses() {
  const [expenses, setExpenses, isInitialized] = useLocalStorage<Expense[]>(STORAGE_KEY, []);

  const addExpense = (formData: ExpenseFormData) => {
    const now = new Date().toISOString();
    const newExpense: Expense = {
      id: generateId(),
      date: formData.date.toISOString(),
      amount: dollarsToCents(formData.amount),
      category: formData.category,
      description: formData.description,
      createdAt: now,
      updatedAt: now,
    };

    setExpenses((prev) => [...prev, newExpense]);
    return newExpense;
  };

  const updateExpense = (id: string, formData: ExpenseFormData) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              date: formData.date.toISOString(),
              amount: dollarsToCents(formData.amount),
              category: formData.category,
              description: formData.description,
              updatedAt: new Date().toISOString(),
            }
          : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const getExpense = (id: string): Expense | undefined => {
    return expenses.find((expense) => expense.id === id);
  };

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses]);

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  return {
    expenses: sortedExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpense,
    totalAmount,
    isInitialized,
  };
}

export function useFilteredExpenses(
  expenses: Expense[],
  startDate?: Date,
  endDate?: Date,
  categories?: CategoryType[],
  searchQuery?: string
) {
  return useMemo(() => {
    let filtered = expenses;

    // Filter by date range
    if (startDate || endDate) {
      filtered = filtered.filter((expense) => {
        const expenseDate = parseISO(expense.date);

        if (startDate && endDate) {
          return isWithinInterval(expenseDate, {
            start: startOfDay(startDate),
            end: endOfDay(endDate),
          });
        } else if (startDate) {
          return expenseDate >= startOfDay(startDate);
        } else if (endDate) {
          return expenseDate <= endOfDay(endDate);
        }

        return true;
      });
    }

    // Filter by categories
    if (categories && categories.length > 0) {
      filtered = filtered.filter((expense) => categories.includes(expense.category));
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((expense) =>
        expense.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [expenses, startDate, endDate, categories, searchQuery]);
}
