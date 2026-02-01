'use client';

import { useState, useMemo } from 'react';
import { Expense, CategoryType } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { formatCurrency, formatDate, exportToCSV, exportToJSON, exportToPDF } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-picker';
import { AlertCircle, Download, FileJson, FileText, Table2 } from 'lucide-react';
import { format } from 'date-fns';

export interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expenses: Expense[];
}

type ExportFormat = 'csv' | 'json' | 'pdf';

export function ExportModal({ open, onOpenChange, expenses }: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [filename, setFilename] = useState('expenses');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  // Filter expenses based on selected criteria
  const filteredExpenses = useMemo(() => {
    let filtered = expenses;

    // Filter by date range
    if (startDate || endDate) {
      filtered = filtered.filter((exp) => {
        const expDate = new Date(exp.date);
        if (startDate && expDate < startDate) return false;
        if (endDate && expDate > endDate) return false;
        return true;
      });
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((exp) => selectedCategories.includes(exp.category));
    }

    return filtered;
  }, [expenses, startDate, endDate, selectedCategories]);

  // Prepare export data
  const exportData = useMemo(() => {
    return filteredExpenses.map((expense) => ({
      Date: formatDate(expense.date),
      Category: expense.category,
      Amount: formatCurrency(expense.amount),
      Description: expense.description,
    }));
  }, [filteredExpenses]);

  const toggleCategory = (category: CategoryType) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedCategories([]);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate slight delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      const fileExtension = {
        csv: 'csv',
        json: 'json',
        pdf: 'pdf',
      }[format];

      const fullFilename = `${filename}.${fileExtension}`;

      if (format === 'csv') {
        exportToCSV(exportData, fullFilename);
      } else if (format === 'json') {
        exportToJSON(exportData, fullFilename);
      } else if (format === 'pdf') {
        exportToPDF(
          filteredExpenses.map((exp) => ({
            Date: formatDate(exp.date),
            Category: exp.category,
            Amount: centsToDollars(exp.amount),
            Description: exp.description,
          })),
          fullFilename,
          'Expense Report'
        );
      }

      // Close modal after export
      onOpenChange(false);
    } finally {
      setIsExporting(false);
    }
  };

  const hasFilters = startDate || endDate || selectedCategories.length > 0;
  const getFileIcon = () => {
    switch (format) {
      case 'json':
        return <FileJson className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      default:
        return <Table2 className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader onClose={() => onOpenChange(false)}>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Data
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-6">
          {/* Summary Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-700">Total Records</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">{filteredExpenses.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {formatCurrency(filteredExpenses.reduce((sum, e) => sum + e.amount, 0))}
                  </p>
                </div>
              </div>
              {hasFilters && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-xs text-blue-600">
                    Showing filtered results. Click "Clear Filters" to export all expenses.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Export Format</label>
            <div className="grid grid-cols-3 gap-3">
              {(['csv', 'json', 'pdf'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    format === fmt
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    {fmt === 'csv' && <Table2 className="h-5 w-5" />}
                    {fmt === 'json' && <FileJson className="h-5 w-5" />}
                    {fmt === 'pdf' && <FileText className="h-5 w-5" />}
                  </div>
                  <span className="text-sm font-medium uppercase">{fmt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filename Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Filename</label>
            <div className="flex items-center gap-2">
              <Input
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="Enter filename..."
              />
              <span className="text-sm text-gray-600">.{format}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              The file extension will be added automatically
            </p>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Date Range</label>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-900">Categories</label>
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => setSelectedCategories([])}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Clear selection
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`transition-opacity ${
                    selectedCategories.includes(category)
                      ? 'opacity-100'
                      : 'opacity-50 hover:opacity-75'
                  }`}
                >
                  <Badge variant="category" category={category}>
                    {category}
                  </Badge>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {selectedCategories.length > 0
                ? `${selectedCategories.length} categories selected`
                : 'All categories will be included'}
            </p>
          </div>

          {/* Filter Summary */}
          {hasFilters && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Filters Applied</p>
                <p className="text-xs text-amber-800 mt-1">
                  {startDate && `Start: ${formatDate(startDate.toISOString())}`}
                  {startDate && endDate && ' • '}
                  {endDate && `End: ${formatDate(endDate.toISOString())}`}
                  {selectedCategories.length > 0 && ' • '}
                  {selectedCategories.length > 0 && `${selectedCategories.length} categories`}
                </p>
                <button
                  onClick={clearFilters}
                  className="text-xs text-amber-700 hover:text-amber-900 font-medium mt-2"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Data Preview */}
          {filteredExpenses.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Preview ({Math.min(5, filteredExpenses.length)} of {filteredExpenses.length} records)
              </label>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Category</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportData.slice(0, 5).map((row, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-4 py-2 text-gray-900">{row.Date}</td>
                        <td className="px-4 py-2">
                          <Badge variant="category" category={row.Category as CategoryType}>
                            {row.Category}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">{row.Amount}</td>
                        <td className="px-4 py-2 text-gray-700 truncate">{row.Description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredExpenses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No expenses match your filters.</p>
              <button onClick={clearFilters} className="text-blue-600 hover:text-blue-700 text-sm mt-2">
                Clear filters
              </button>
            </div>
          )}
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={filteredExpenses.length === 0 || isExporting}
            className="flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                Exporting...
              </>
            ) : (
              <>
                {getFileIcon()}
                Export as {format.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function imported from utils
function centsToDollars(cents: number): string {
  return (cents / 100).toFixed(2);
}
