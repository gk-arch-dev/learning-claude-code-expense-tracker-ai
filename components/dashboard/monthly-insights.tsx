'use client';

import { Expense, CategoryType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORY_COLORS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { startOfMonth, endOfMonth, eachDayOfInterval, differenceInDays } from 'date-fns';

export interface MonthlyInsightsProps {
  expenses: Expense[];
}

const CATEGORY_EMOJIS: Record<CategoryType, string> = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Bills: '💡',
  Other: '📦',
};

export function MonthlyInsights({ expenses }: MonthlyInsightsProps) {
  // Filter for current month expenses
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const monthlyExpenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    return expDate >= monthStart && expDate <= monthEnd;
  });

  // Calculate category totals
  const categoryTotals = monthlyExpenses.reduce(
    (acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    },
    {} as Record<CategoryType, number>
  );

  // Prepare chart data for donut
  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount / 100, // Convert cents to dollars
    color: CATEGORY_COLORS[category as CategoryType],
  }));

  // Get top 3 categories by spending
  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category, amount]) => ({
      category: category as CategoryType,
      amount,
      emoji: CATEGORY_EMOJIS[category as CategoryType],
      color: CATEGORY_COLORS[category as CategoryType],
    }));

  // Calculate budget streak (consecutive days under daily budget)
  const calculateBudgetStreak = () => {
    const dailyBudgetCents = 10000; // $100 per day threshold
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: now });

    let currentStreak = 0;

    for (let i = daysInMonth.length - 1; i >= 0; i--) {
      const day = daysInMonth[i];
      const dayExpenses = monthlyExpenses.filter((exp) => {
        const expDate = new Date(exp.date);
        return expDate.toDateString() === day.toDateString();
      });

      const dayTotal = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);

      if (dayTotal <= dailyBudgetCents) {
        currentStreak++;
      } else {
        break;
      }
    }

    return currentStreak;
  };

  const budgetStreak = calculateBudgetStreak();

  if (monthlyExpenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex items-center justify-center text-gray-500">
            No expenses this month
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Donut Chart */}
        <div className="relative">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `$${typeof value === 'number' ? value.toFixed(2) : '0.00'}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Spending</p>
            </div>
          </div>
        </div>

        {/* Top 3 Categories */}
        <div className="space-y-4">
          {topCategories.map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <div
                className="w-1 h-12 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-lg font-medium">
                {item.category}: {formatCurrency(item.amount)}
              </span>
            </div>
          ))}
        </div>

        {/* Budget Streak */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Budget Streak</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-green-500">
                  {budgetStreak}
                </span>
                <span className="text-2xl text-gray-600">days!</span>
              </div>
            </div>
            <div className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
