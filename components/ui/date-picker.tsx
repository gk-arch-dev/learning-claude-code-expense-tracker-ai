'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface DatePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  label?: string;
  error?: string;
  placeholder?: string;
}

export function DatePicker({ date, onDateChange, label, error, placeholder = 'Pick a date' }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-gray-400',
            error && 'border-red-500'
          )}
          onClick={() => setOpen(!open)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
        {open && (
          <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                onDateChange(selectedDate);
                setOpen(false);
              }}
              className="rdp"
            />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  label?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  label,
}: DateRangePickerProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="grid grid-cols-2 gap-2">
        <DatePicker
          date={startDate}
          onDateChange={onStartDateChange}
          placeholder="Start date"
        />
        <DatePicker
          date={endDate}
          onDateChange={onEndDateChange}
          placeholder="End date"
        />
      </div>
    </div>
  );
}
