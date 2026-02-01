import { Expense } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="category" category={expense.category}>
            {expense.category}
          </Badge>
          <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
        </div>
        <p className="text-sm text-gray-900 truncate">{expense.description}</p>
      </div>
      <div className="flex items-center gap-3 ml-4">
        <span className="text-lg font-semibold text-gray-900">
          {formatCurrency(expense.amount)}
        </span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(expense)}
            aria-label="Edit expense"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(expense)}
            aria-label="Delete expense"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
