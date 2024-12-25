import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-white p-6 dark:bg-gray-800 dark:border-gray-700',
          hover && 'transition-shadow hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);