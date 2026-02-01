import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from './button';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogContent.displayName = 'DialogContent';

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between p-6 border-b border-gray-200', className)}
        {...props}
      >
        <div className="flex-1">{children}</div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="ml-4">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    />
  );
});

DialogTitle.displayName = 'DialogTitle';

export const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('p-6', className)} {...props} />;
  }
);

DialogBody.displayName = 'DialogBody';

export const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-end gap-2 p-6 border-t border-gray-200', className)}
        {...props}
      />
    );
  }
);

DialogFooter.displayName = 'DialogFooter';
