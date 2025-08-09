import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(99,102,241,.5)] disabled:pointer-events-none disabled:opacity-50 active:scale-[.99]',
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background hover:opacity-90 shadow-soft',
        outline: 'border bg-card hover:bg-[rgba(0,0,0,.03)]',
        ghost: 'hover:bg-[rgba(0,0,0,.04)]',
        link: 'text-[rgb(var(--accent))] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      const { children } = props;
      return <span className={cn(buttonVariants({ variant, size, className }))}>{children}</span>;
    }
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';


