'use client';

import { MonthlyInsights } from '@/components/dashboard/monthly-insights';
import { useExpenses } from '@/lib/hooks/useExpenses';

export default function InsightsPage() {
  const { expenses, isInitialized } = useExpenses();

  if (!isInitialized) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-[500px]">
          <div className="text-gray-500">Loading insights...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MonthlyInsights expenses={expenses} />
    </div>
  );
}
