import { useState } from 'react';
import { CategoryType } from '../types';

export function useFilters() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const hasActiveFilters = Boolean(
    startDate || endDate || selectedCategories.length > 0 || searchQuery.trim()
  );

  return {
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
  };
}
