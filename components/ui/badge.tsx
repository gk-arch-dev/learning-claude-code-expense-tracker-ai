import * as React from 'react';
import { cn } from '@/lib/utils';
import { CategoryType } from '@/lib/types';
import { CATEGORY_BG_COLORS } from '@/lib/constants';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  category?: CategoryType;
  variant?: 'default' | 'category';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, category, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
          variant === 'default' && 'bg-gray-100 text-gray-800',
          variant === 'category' && category && `${CATEGORY_BG_COLORS[category]} text-white`,
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
