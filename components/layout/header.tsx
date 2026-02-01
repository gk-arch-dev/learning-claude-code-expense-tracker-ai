import { Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
