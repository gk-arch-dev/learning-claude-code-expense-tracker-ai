# Expense Tracker AI

A modern, production-ready expense tracking application built with Next.js 14, TypeScript, Tailwind CSS, and localStorage persistence.

![Expense Tracker](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

### Core Functionality
- **Expense Management**: Add, edit, and delete expenses with ease
- **Smart Categorization**: 6 pre-defined categories (Food, Transportation, Entertainment, Shopping, Bills, Other)
- **Persistent Storage**: All data saved to browser localStorage
- **Advanced Filtering**: Filter by date range, categories, and search descriptions
- **Data Export**: Export expenses to CSV format

### Dashboard Analytics
- **Summary Cards**: View total, monthly, and weekly spending at a glance
- **Spending Trends**: Interactive bar chart showing daily spending over the last 7 days
- **Category Breakdown**: Pie chart visualization of spending by category
- **Recent Expenses**: Quick view of your latest transactions

### User Experience
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Form Validation**: Robust validation using Zod schemas
- **Intuitive UI**: Clean, modern interface with smooth transitions
- **Delete Confirmation**: Prevent accidental deletions with confirmation dialogs
- **Loading States**: Graceful loading indicators

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Utility-first styling |
| **React Hook Form** | Form state management |
| **Zod** | Schema validation |
| **Recharts** | Data visualization |
| **date-fns** | Date manipulation |
| **react-day-picker** | Calendar component |
| **Lucide React** | Icon library |

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
expense-tracker-ai/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with header & navigation
│   ├── page.tsx                 # Dashboard page
│   ├── expenses/page.tsx        # Expenses management page
│   └── globals.css              # Global styles & Tailwind config
├── components/
│   ├── ui/                      # Reusable UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   └── date-picker.tsx
│   ├── layout/                  # Layout components
│   │   ├── header.tsx
│   │   └── navigation.tsx
│   ├── expenses/                # Expense-specific components
│   │   ├── expense-form.tsx
│   │   ├── expense-list.tsx
│   │   ├── expense-item.tsx
│   │   ├── expense-filters.tsx
│   │   └── expense-summary.tsx
│   └── dashboard/               # Dashboard components
│       ├── summary-cards.tsx
│       ├── spending-chart.tsx
│       ├── category-chart.tsx
│       └── recent-expenses.tsx
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   ├── constants.ts             # App constants & colors
│   ├── validations.ts           # Zod schemas
│   ├── storage.ts               # localStorage utilities
│   ├── utils.ts                 # Helper functions
│   └── hooks/                   # Custom React hooks
│       ├── useExpenses.ts       # Main state management
│       ├── useLocalStorage.ts   # Storage hook
│       └── useFilters.ts        # Filter state
└── public/                      # Static assets
```

## Data Model

### Expense Interface
```typescript
interface Expense {
  id: string;              // Unique identifier
  date: string;            // ISO date string
  amount: number;          // Amount in cents
  category: CategoryType;  // Expense category
  description: string;     // Description
  createdAt: string;       // Creation timestamp
  updatedAt: string;       // Last update timestamp
}
```

### Categories
- Food (Green)
- Transportation (Blue)
- Entertainment (Pink)
- Shopping (Amber)
- Bills (Red)
- Other (Gray)

## Key Features Explained

### Currency Handling
All amounts are stored as integers (cents) to avoid floating-point precision issues:
```typescript
dollarsToCents('10.50') → 1050
formatCurrency(1050) → '$10.50'
```

### Date Management
Dates are stored as ISO strings for consistency:
```typescript
new Date().toISOString() → '2024-01-15T10:30:00.000Z'
formatDate('2024-01-15T10:30:00.000Z') → 'Jan 15, 2024'
```

### Filtering
Multiple filter types can be applied simultaneously:
- **Date Range**: Start and/or end date
- **Categories**: Multiple category selection
- **Search**: Text search in descriptions

### CSV Export
Export filtered expenses to CSV with proper escaping:
- Handles commas and quotes in descriptions
- Includes formatted dates and amounts
- Downloads automatically

## Usage Guide

### Adding an Expense
1. Click "Add Expense" button
2. Fill in the form:
   - Select a date (defaults to today)
   - Enter amount in dollars (e.g., 25.50)
   - Choose a category
   - Add a description
3. Click "Add Expense" to save

### Editing an Expense
1. Click the edit (pencil) icon on any expense
2. Modify the fields in the dialog
3. Click "Update Expense" to save changes

### Deleting an Expense
1. Click the delete (trash) icon
2. Confirm deletion in the dialog
3. Expense is permanently removed

### Filtering Expenses
1. Use the filter panel on the expenses page
2. Select date range, categories, or search
3. Click "Clear Filters" to reset

### Exporting Data
1. Apply any filters you want
2. Click "Export CSV" button
3. File downloads automatically

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Run production server
npm run lint         # Run ESLint
```

### Code Style
- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Functional components with hooks
- CSS utility classes with Tailwind

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Server-side rendering for initial load
- Client-side hydration for interactivity
- Optimized bundle splitting
- Lazy loading of chart components
- Efficient localStorage operations

## Data Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- No analytics or tracking
- Clear localStorage to delete all data

## Known Limitations

- Data is not synced across devices
- Limited to browser's localStorage quota (~5MB)
- No backup/restore functionality
- No user authentication

## Future Enhancements

Potential features for future versions:
- Cloud sync with user accounts
- Recurring expenses
- Budget tracking and alerts
- Multiple currencies
- Receipt photo uploads
- Dark mode
- Export to PDF
- Data backup/restore
- Mobile app

## Troubleshooting

### Data not persisting
- Check browser localStorage is enabled
- Verify you're not in incognito/private mode
- Check console for errors

### Build errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check browser console for CSS errors
- Clear browser cache

## License

MIT License - feel free to use this project for learning or personal use.

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Lucide Icons](https://lucide.dev/)

---

**Happy expense tracking! 💰📊**
