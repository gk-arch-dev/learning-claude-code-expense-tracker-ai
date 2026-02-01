'use client';

import { useState } from 'react';
import { useExpenses, useFilteredExpenses } from '@/lib/hooks/useExpenses';
import { useFilters } from '@/lib/hooks/useFilters';
import { ExpenseForm } from '@/components/expenses/expense-form';
import { ExpenseList } from '@/components/expenses/expense-list';
import { ExpenseFilters } from '@/components/expenses/expense-filters';
import { ExpenseSummary } from '@/components/expenses/expense-summary';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from '@/components/ui/dialog';
import { Expense } from '@/lib/types';
import { ExpenseFormValues } from '@/lib/validations';
import { Plus, Download } from 'lucide-react';
import { exportToCSV, formatCurrency, formatDate } from '@/lib/utils';

export default function ExpensesPage() {
  const { expenses, addExpense, updateExpense, deleteExpense, isInitialized } = useExpenses();
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedCategories,
    setSelectedCategories,
    searchQuery,
    setSearchQuery,
    clearFilters,
    hasActiveFilters,
  } = useFilters();

  const filteredExpenses = useFilteredExpenses(
    expenses,
    startDate,
    endDate,
    selectedCategories,
    searchQuery
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | undefined>();

  const handleSubmit = (data: ExpenseFormValues) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, data);
    } else {
      addExpense(data);
    }
    setIsFormOpen(false);
    setEditingExpense(undefined);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (expense: Expense) => {
    setExpenseToDelete(expense);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (expenseToDelete) {
      deleteExpense(expenseToDelete.id);
      setIsDeleteDialogOpen(false);
      setExpenseToDelete(undefined);
    }
  };

  const handleExportCSV = () => {
    const csvData = filteredExpenses.map((expense) => ({
      Date: formatDate(expense.date),
      Category: expense.category,
      Description: expense.description,
      Amount: formatCurrency(expense.amount),
    }));
    exportToCSV(csvData, 'expenses.csv');
  };

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
        <div className="flex gap-2">
          {filteredExpenses.length > 0 && (
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          )}
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ExpenseFilters
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <div className="lg:col-span-3 space-y-4">
          <ExpenseSummary totalAmount={totalAmount} count={filteredExpenses.length} />
          <ExpenseList
            expenses={filteredExpenses}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setIsFormOpen(false)}>
            <DialogTitle>{editingExpense ? 'Edit' : 'Add'} Expense</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <ExpenseForm
              expense={editingExpense}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingExpense(undefined);
              }}
            />
          </DialogBody>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setIsDeleteDialogOpen(false)}>
            <DialogTitle>Delete Expense</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this expense? This action cannot be undone.
            </p>
            {expenseToDelete && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  {formatDate(expenseToDelete.date)} • {expenseToDelete.category}
                </p>
                <p className="text-gray-900 mt-1">{expenseToDelete.description}</p>
                <p className="text-lg font-semibold text-gray-900 mt-2">
                  {formatCurrency(expenseToDelete.amount)}
                </p>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
}
