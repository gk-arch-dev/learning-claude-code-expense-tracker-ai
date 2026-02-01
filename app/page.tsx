'use client';

import { useExpenses } from '@/lib/hooks/useExpenses';
import { useExportModal } from '@/lib/hooks/useExportModal';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { CategoryChart } from '@/components/dashboard/category-chart';
import { RecentExpenses } from '@/components/dashboard/recent-expenses';
import { ExportModal } from '@/components/export/export-modal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Download } from 'lucide-react';

export default function DashboardPage() {
  const { expenses, isInitialized } = useExpenses();
  const { isOpen: isExportOpen, open: openExport, setIsOpen: setIsExportOpen } = useExportModal();

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your spending and manage expenses</p>
          </div>
          <div className="flex gap-2">
            {expenses.length > 0 && (
              <Button variant="outline" onClick={openExport}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            )}
            <Link href="/expenses">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <SummaryCards expenses={expenses} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingChart expenses={expenses} />
            <CategoryChart expenses={expenses} />
          </div>

          <RecentExpenses expenses={expenses} limit={10} />
        </div>
      </div>

      <ExportModal
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        expenses={expenses}
      />
    </>
  );
}
