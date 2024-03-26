import { cn } from '@/app/utils/cn';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';

type InputCurrencyProps = {
  error?: string;
  value?: string;
  onChange?(value: string): void;
};

export const InputCurrency = ({ error, onChange, value }: InputCurrencyProps) => {
  return (
    <div>
      <NumericFormat
        decimalSeparator='.'
        thousandSeparator=','
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[1px] outline-none',
          error && 'text-red-900'
        )}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && (
        <div className='flex gap-2 items-center mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className='text-xs'>{error}</span>
        </div>
      )}
    </div>
  );
};
