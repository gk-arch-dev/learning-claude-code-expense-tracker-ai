'use client';

import { CategoryType } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-picker';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES } from '@/lib/constants';
import { X } from 'lucide-react';

export interface ExpenseFiltersProps {
  startDate?: Date;
  endDate?: Date;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  selectedCategories: CategoryType[];
  onCategoriesChange: (categories: CategoryType[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function ExpenseFilters({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  selectedCategories,
  onCategoriesChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  hasActiveFilters,
}: ExpenseFiltersProps) {
  const toggleCategory = (category: CategoryType) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search descriptions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        label="Date Range"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`transition-opacity ${isSelected ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
              >
                <Badge variant="category" category={category}>
                  {category}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
