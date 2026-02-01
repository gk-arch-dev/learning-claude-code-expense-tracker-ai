'use client';

import { Expense } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO, startOfDay, subDays } from 'date-fns';

export interface SpendingChartProps {
  expenses: Expense[];
}

export function SpendingChart({ expenses }: SpendingChartProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    return {
      date: date.toISOString(),
      label: format(date, 'EEE'),
    };
  });

  const chartData = last7Days.map((day) => {
    const dayExpenses = expenses.filter(
      (exp) => startOfDay(parseISO(exp.date)).toISOString() === day.date
    );
    const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    return {
      name: day.label,
      amount: total / 100, // Convert cents to dollars
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trend (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              formatter={(value) => [`$${typeof value === 'number' ? value.toFixed(2) : '0.00'}`, 'Amount']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
            />
            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
