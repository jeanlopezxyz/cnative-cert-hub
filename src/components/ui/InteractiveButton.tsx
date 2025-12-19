/**
 * InteractiveButton - shadcn/ui Button with custom CNCF styling
 * Migrated to use shadcn/ui Button component while preserving existing API
 */

import React, { forwardRef } from 'react';
import { Button, type ButtonProps } from '@/components/shadcn/ui/button';
import { cn } from '@/lib/utils';

type ShadcnVariant = NonNullable<ButtonProps['variant']>;
type ShadcnSize = NonNullable<ButtonProps['size']>;

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', ...props }, ref) => {
    // Map custom variants to shadcn variants
    const variantMap: Record<string, ShadcnVariant> = {
      primary: 'default',
      secondary: 'secondary',
      ghost: 'ghost',
      outline: 'outline',
    };
    const sizeMap: Record<string, ShadcnSize> = {
      sm: 'sm',
      md: 'default',
      lg: 'lg',
    };

    const shadcnVariant = variantMap[variant] || 'default';
    const shadcnSize = sizeMap[size] || 'default';

    // Custom gradient styles for primary and secondary variants
    const customVariantClasses = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all duration-300',
      secondary: 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95 transition-all duration-300',
      ghost: 'active:scale-95 transition-all duration-300',
      outline: 'border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all duration-300'
    };

    return (
      <Button
        ref={ref}
        variant={shadcnVariant}
        size={shadcnSize}
        className={cn(
          'transform-gpu',
          customVariantClasses[variant],
          size === 'md' && 'px-5 py-2.5',
          className
        )}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

InteractiveButton.displayName = 'InteractiveButton';

export default InteractiveButton;