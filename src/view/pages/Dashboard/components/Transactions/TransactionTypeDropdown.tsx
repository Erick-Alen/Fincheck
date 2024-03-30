import { DropdownMenu } from '@/view/components/Dropdown';
import { ExpensesIcon } from '@/view/components/icons/ExpensesIcon';
import { IncomeIcon } from '@/view/components/icons/IncomeIcon';
import { TransactionsIcon } from '@/view/components/icons/TransactionsIcon';
import { ChevronDownIcon } from '@radix-ui/react-icons';

type TransactionTypeDropdownProps = {
  onClick(type: 'INCOME' | 'OUTCOME' | undefined): void;
  selectedType: 'INCOME' | 'OUTCOME' | undefined ;
};

export const TransactionTypeDropdown = ({
  onClick,
  selectedType,
}: TransactionTypeDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className='flex items-center gap-2'>
          {selectedType === 'INCOME' && <IncomeIcon color />}
          {selectedType === 'OUTCOME' && <ExpensesIcon color />}
          {selectedType === undefined && <TransactionsIcon color />}
          <span className='text-sm text-gray-800 tracking-[-0.5] font-medium'>
            {selectedType === 'INCOME' && 'Receipts'}
            {selectedType === 'OUTCOME' && 'Expenses'}
            {selectedType === undefined && 'Transactions'}
          </span>
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.PortalContent className='w-64'>
        <DropdownMenu.Item onClick={() => onClick('INCOME')} className='gap-2'>
          <IncomeIcon color />
          Receipts
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => onClick('OUTCOME')} className='gap-2'>
          <ExpensesIcon color />
          Expenses
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => onClick(undefined)} className='gap-2'>
          <TransactionsIcon color />
          Transactions
        </DropdownMenu.Item>
      </DropdownMenu.PortalContent>
    </DropdownMenu.Root>
  );
};
