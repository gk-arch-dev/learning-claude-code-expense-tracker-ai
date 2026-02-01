import { z } from 'zod';

export const expenseFormSchema = z.object({
  date: z.date(),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0 && num <= 999999.99;
      },
      {
        message: 'Amount must be a valid number between 0.01 and 999,999.99',
      }
    ),
  category: z.enum(['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other']),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(200, 'Description must be 200 characters or less'),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;
