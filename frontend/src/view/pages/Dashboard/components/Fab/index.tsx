import { DropdownMenu } from '@/view/components/Dropdown';
import { BankAccountIcon } from '@/view/components/icons/BankAccountIcon';
import { TransactionsIcon } from '@/view/components/icons/TransactionsIcon';
import { CategoryIcon } from '@/view/components/icons/categories/CategoryIcon';
import { PlusIcon } from '@radix-ui/react-icons';
import { useDashboard } from '../DashboardContext/useDashboardContext';

export const Fab = () => {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();
  return (
    <div className='fixed right-4 bottom-4'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className='flex justify-center items-center bg-teal-900 text-white w-12 h-12 rounded-full'>
            <PlusIcon className=' w-6 h-6 ' />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.PortalContent className='gap-2'>
          <DropdownMenu.Item onClick={() => openNewTransactionModal('OUTCOME')}>
            <CategoryIcon type='outcome' />
            Nova Despesa
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => openNewTransactionModal('INCOME')}>
            <CategoryIcon type='income' />
            Nova Receita
          </DropdownMenu.Item>
          {/* <DropdownMenu.Item>
            <TransactionsIcon color />
            Nova Transação
          </DropdownMenu.Item> */}
          <DropdownMenu.Item onClick={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.PortalContent>
      </DropdownMenu.Root>
    </div>
  );
};
