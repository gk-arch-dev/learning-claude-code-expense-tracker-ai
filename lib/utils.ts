import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency conversion utilities
export const dollarsToCents = (dollars: string): number => {
  const amount = parseFloat(dollars);
  if (isNaN(amount)) return 0;
  return Math.round(amount * 100);
};

export const centsToDollars = (cents: number): string => {
  return (cents / 100).toFixed(2);
};

export const formatCurrency = (cents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
};

// Date formatting utilities
export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch {
    return dateString;
  }
};

export const formatDateLong = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  } catch {
    return dateString;
  }
};

// ID generation
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// Export utilities
export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header];
        // Escape values containing commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, filename);
};

export const exportToJSON = (data: any[], filename: string): void => {
  if (data.length === 0) return;

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  downloadFile(blob, filename);
};

export const exportToPDF = (data: any[], filename: string, title: string = 'Expense Report'): void => {
  if (data.length === 0) return;

  const doc = new jsPDF();

  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 15);

  // Add metadata
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 25);
  doc.text(`Total Records: ${data.length}`, 14, 32);

  // Reset text color for table
  doc.setTextColor(0, 0, 0);

  // Add table
  const headers = Object.keys(data[0]);
  const rows = data.map((item) =>
    headers.map((header) => String(item[header]))
  );

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 40,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  doc.save(filename);
};

// Helper function for file downloads
const downloadFile = (blob: Blob, filename: string): void => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
