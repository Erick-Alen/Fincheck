import { ComponentProps } from 'react';
import { cn } from '../../app/utils/cn';
import { Spinner } from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isPending?: boolean;
  variant?: 'danger' | 'ghost';
}

export const Button = ({
  className,
  isPending,
  disabled,
  children,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isPending}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 text-white disabled:bg-gray-100 disabled:text-gray-400 font-medium rounded-2xl px-6 h-12 active:bg-teal-950 transition-all flex items-center justify-center',
        variant === 'danger' && 'bg-red-800 hover:bg-red-700 active:bg-red-900',
        variant === 'ghost' &&
          'border border-black text-gray-800 bg-slate-100 hover:bg-slate-50 active:bg-slate-200 active:text-black',
        className
      )}
    >
      {!isPending && children}
      {isPending && <Spinner danger={variant === 'danger'} />}
    </button>
  );
};
