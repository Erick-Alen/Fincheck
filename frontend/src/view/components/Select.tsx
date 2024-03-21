import * as RdxSelect from '@radix-ui/react-select';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/app/utils/cn';
import { useState } from 'react';

type SelectProps = {
  className?: string;
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
};

export const Select = ({
  className,
  error,
  placeholder,
  options,
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <div>
      <div className='relative'>
        <label
          className={cn(
            'absolute z-10 left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all',
            [
              selectedValue &&
                'left-[13px] text-xs top-1 transition-all translate-y-0',
            ]
          )}
        >
          {placeholder}
        </label>
        <RdxSelect.Root onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              'w-full bg-white rounded-lg border border-gray-500 text-gray-80 p-3 h-[52px] placeholder-shown:pt-0 focus:outline-slate-600 transition-all text-left relative pt-5',
              error && '!border-red-500 ! focus: !outline-red-500',
              className
            )}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className='absolute right-3 top-1/2 -translate-y-1/2'>
              <ChevronDownIcon className='w-6 h-6 text-gray-800' />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>
          <RdxSelect.Portal>
            <RdxSelect.Content className='z-50 overflow-hidden bg-white rounded-xl border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]'>
              <RdxSelect.ScrollUpButton className='flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default'>
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className=''>
                {options.map((option) => {
                  return (
                    <RdxSelect.Item
                      key={option.value}
                      value={option.value}
                      className='p-2 text-gray-800 text-md data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg hover:cursor-pointer transition-colors'
                    >
                      <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                    </RdxSelect.Item>
                  );
                })}
              </RdxSelect.Viewport>
              <RdxSelect.ScrollDownButton className='flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default text-gray-800'>
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>
      {error && (
        <div className='flex gap-2 items-center mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className='text-xs'>{error}</span>
        </div>
      )}
    </div>
  );
};

// const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
//   return (

//   );
// });
