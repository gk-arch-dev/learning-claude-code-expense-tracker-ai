import { Expense } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface RecentExpensesProps {
  expenses: Expense[];
  limit?: number;
}

export function RecentExpenses({ expenses, limit = 5 }: RecentExpensesProps) {
  const recentExpenses = expenses.slice(0, limit);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Expenses</CardTitle>
        <Link
          href="/expenses"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {recentExpenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No expenses yet</p>
        ) : (
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="category" category={expense.category}>
                      {expense.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{formatDate(expense.date)}</span>
                  </div>
                  <p className="text-sm text-gray-900 truncate">{expense.description}</p>
                </div>
                <span className="text-base font-semibold text-gray-900 ml-4">
                  {formatCurrency(expense.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
