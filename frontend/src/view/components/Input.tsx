import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';
import { cn } from '../../app/utils/cn';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div className='relative'>
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          className={cn(
            'w-full bg-white rounded-lg border border-gray-500 text-gray-800 px-3 h-[52px] pt-4 peer placeholder-shown:pt-0 focus:outline-slate-600 transition-all',
            error && '!border-red-900 ! focus: !outline-red-900',
            className
          )}
          placeholder=' '
        />
        <label
          id={inputId}
          htmlFor={name}
          className='absolute left-[13px] text-xs top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all'
        >
          {placeholder}
        </label>
        {error && (
          <div className='flex gap-2 items-center mt-2 text-red-900'>
            <CrossCircledIcon />
            <span className='text-xs'>{error}</span>
          </div>
        )}
      </div>
    );
  }
);
