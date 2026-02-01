import { Expense } from '@/lib/types';
import { ExpenseItem } from './expense-item';
import { Card } from '@/components/ui/card';

export interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-gray-500 text-lg">No expenses found</p>
        <p className="text-gray-400 text-sm mt-2">Add your first expense to get started</p>
      </Card>
    );
  }

  return (
    <Card className="divide-y divide-gray-200">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Card>
  );
}
