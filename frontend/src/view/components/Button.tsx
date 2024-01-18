import { ComponentProps } from 'react';
import { cn } from '../../app/utils/cn';
import { Spinner } from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isPending?: boolean;
}

export const Button = ({
  className,
  isPending,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isPending}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 text-white disabled:bg-gray-100 disabled:text-gray-400 font-medium rounded-2xl px-6 h-12 active:bg-teal-950 transition-all flex items-center justify-center',
        className
      )}
    >
      {!isPending && children}
      {isPending && <Spinner />}
    </button>
  );
};
