import { Expense } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import { DollarSign, Calendar, TrendingUp, List } from 'lucide-react';

export interface SummaryCardsProps {
  expenses: Expense[];
}

export function SummaryCards({ expenses }: SummaryCardsProps) {
  const now = new Date();

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const monthlyAmount = expenses
    .filter((exp) =>
      isWithinInterval(parseISO(exp.date), {
        start: startOfMonth(now),
        end: endOfMonth(now),
      })
    )
    .reduce((sum, exp) => sum + exp.amount, 0);

  const weeklyAmount = expenses
    .filter((exp) =>
      isWithinInterval(parseISO(exp.date), {
        start: startOfWeek(now),
        end: endOfWeek(now),
      })
    )
    .reduce((sum, exp) => sum + exp.amount, 0);

  const cards = [
    {
      title: 'Total Spending',
      value: formatCurrency(totalAmount),
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'This Month',
      value: formatCurrency(monthlyAmount),
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'This Week',
      value: formatCurrency(weeklyAmount),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Expenses',
      value: expenses.length.toString(),
      icon: List,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
