export type CategoryType = 'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';

export interface Expense {
  id: string;
  date: string; // ISO date string
  amount: number; // In cents
  category: CategoryType;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  date: Date;
  amount: string; // Dollar amount as string
  category: CategoryType;
  description: string;
}

export interface ExpenseFilters {
  startDate?: Date;
  endDate?: Date;
  categories: CategoryType[];
  searchQuery: string;
}
