'use client';

import { useExpenses } from '@/lib/hooks/useExpenses';
import { useCloudExportModal } from '@/lib/hooks/useCloudExportModal';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { CategoryChart } from '@/components/dashboard/category-chart';
import { RecentExpenses } from '@/components/dashboard/recent-expenses';
import { CloudExportModal } from '@/components/export/cloud-export-modal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Cloud } from 'lucide-react';

export default function DashboardPage() {
  const { expenses, isInitialized } = useExpenses();
  const { isOpen: isCloudExportOpen, open: openCloudExport, setIsOpen: setIsCloudExportOpen } = useCloudExportModal();

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
              <Button variant="outline" onClick={openCloudExport}>
                <Cloud className="h-4 w-4 mr-2" />
                Cloud Export
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

      <CloudExportModal
        open={isCloudExportOpen}
        onOpenChange={setIsCloudExportOpen}
        expenses={expenses}
      />
    </>
  );
}
