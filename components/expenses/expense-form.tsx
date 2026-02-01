'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { expenseFormSchema, ExpenseFormValues } from '@/lib/validations';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { CATEGORIES } from '@/lib/constants';
import { Expense } from '@/lib/types';
import { centsToDollars } from '@/lib/utils';
import { parseISO } from 'date-fns';

export interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: (data: ExpenseFormValues) => void;
  onCancel: () => void;
}

export function ExpenseForm({ expense, onSubmit, onCancel }: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: expense
      ? {
          date: parseISO(expense.date),
          amount: centsToDollars(expense.amount),
          category: expense.category,
          description: expense.description,
        }
      : {
          date: new Date(),
          amount: '',
          category: 'Food',
          description: '',
        },
  });

  const selectedDate = watch('date');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <DatePicker
        date={selectedDate}
        onDateChange={(date) => setValue('date', date || new Date())}
        label="Date"
        error={errors.date?.message}
      />

      <Input
        label="Amount"
        type="text"
        placeholder="0.00"
        error={errors.amount?.message}
        {...register('amount')}
      />

      <Select
        label="Category"
        options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
        error={errors.category?.message}
        {...register('category')}
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter expense description..."
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {expense ? 'Update' : 'Add'} Expense
        </Button>
      </div>
    </form>
  );
}
