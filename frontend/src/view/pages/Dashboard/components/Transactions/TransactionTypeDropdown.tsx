import { DropdownMenu } from '@/view/components/Dropdown';
import { ExpensesIcon } from '@/view/components/icons/ExpensesIcon';
import { IncomeIcon } from '@/view/components/icons/IncomeIcon';
import { TransactionsIcon } from '@/view/components/icons/TransactionsIcon';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export const TransactionTypeDropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className='flex items-center gap-2'>
          <TransactionsIcon />
          <span className='text-sm text-gray-800 tracking-[-0.5] font-medium'>
            Transações
          </span>
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.PortalContent className='w-64'>
        <DropdownMenu.Item className='gap-2'>
          <IncomeIcon color />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item className='gap-2'>
          <ExpensesIcon color />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item className='gap-2'>
          <TransactionsIcon color />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.PortalContent>
    </DropdownMenu.Root>
  );
};
