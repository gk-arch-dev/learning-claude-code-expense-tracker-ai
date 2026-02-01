import { formatCurrency } from '@/lib/utils';

export interface ExpenseSummaryProps {
  totalAmount: number;
  count: number;
}

export function ExpenseSummary({ totalAmount, count }: ExpenseSummaryProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-700 font-medium">Total Expenses</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">
            {formatCurrency(totalAmount)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-700 font-medium">Count</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">{count}</p>
        </div>
      </div>
    </div>
  );
}
