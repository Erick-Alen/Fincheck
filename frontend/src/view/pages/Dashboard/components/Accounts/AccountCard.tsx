import { formatCurrency } from '@/app/utils/formatCurrency';
import { BankAccountTypeIcon } from '@/view/components/icons/BankAccountTypeIcon';
import { useDashboard } from '../DashboardContext/useDashboardContext';
import { cn } from '@/app/utils/cn';

type AccountCardProps = {
  color: string;
  balance: number;
  name: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
};

export const AccountCard = ({ color, balance, name, type }: AccountCardProps) => {
  const { valuesVisible } = useDashboard();
  return (
    <div
      className='bg-white rounded-2xl p-4 h-[200px] flex flex-col justify-between border-b-4 border-teal-950'
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className='font-medium text-gray-800 tracking-[-0.5px] mt-4 block'>
          {name}
        </span>
      </div>

      <div>
        <span className={cn('font-medium text-gray-800 tracking-[-0.5px] mt-4 block', !valuesVisible && 'blur-sm transition-all')}>
          {formatCurrency(balance)}
        </span>
        <small className='text-sm text-gray-600 '>Saldo Atual</small>
      </div>
    </div>
  );
};
