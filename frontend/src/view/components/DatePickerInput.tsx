import { cn } from '@/app/utils/cn';
import { formatDate } from '@/app/utils/formatDate';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Popover } from './Popover';
import { DatePicker } from './DatePicker';

type DatePickerInputProps = {
  className?: string;
  error?: string;
};

export const DatePickerInput = ({ className, error }: DatePickerInputProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Popover.Root>
      <Popover.Trigger>
        <div>
          <button
            type='button'
            className={cn(
              'w-full bg-white rounded-lg border border-gray-500 text-gray-700 p-3 h-[52px] placeholder-shown:pt-0 focus:outline-slate-600 transition-all text-left relative pt-5',
              error && '!border-red-500 ! focus: !outline-red-500',
              className
            )}
          >
            <span className='absolute left-3 top-2 text-xs text-gray-700 pointer-events-none'>
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
          {error && (
            <div className='flex gap-2 items-center mt-2 text-red-900'>
              <CrossCircledIcon />
              <span className='text-xs'>{error}</span>
            </div>
          )}
        </div>
      </Popover.Trigger>
      <Popover.Content>
        <DatePicker value={selectedDate} onChange={date => setSelectedDate(date)}/>
      </Popover.Content>
    </Popover.Root>
  );
};
