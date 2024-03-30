import { formatCurrency } from '@/app/utils/formatCurrency';
import { BankAccountTypeIcon } from '@/view/components/icons/BankAccountTypeIcon';
import { useDashboard } from '../DashboardContext/useDashboardContext';
import { cn } from '@/app/utils/cn';
import { BankAccount } from '@/app/entities/BankAccount';

type AccountCardProps = {
  data: BankAccount
};

export const AccountCard = ({ data }: AccountCardProps) => {
  const { color, name, type, currentBalance } = data;
  const { valuesVisible, openEditAccountModal } = useDashboard();
  return (
    <div
      className='bg-white rounded-2xl p-4 h-[200px] flex flex-col justify-between border-b-4 border-teal-950'
      style={{ borderColor: color }}
      role='button'
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className='font-medium text-gray-800 tracking-[-0.5px] mt-4 block'>
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            'font-medium text-gray-800 tracking-[-0.5px] mt-4 block',
            !valuesVisible && 'blur-sm transition-all'
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className='text-sm text-gray-600 '>Current balance</small>
      </div>
    </div>
  );
};
