import { cn } from '@/app/utils/cn';
import { Button } from '@/view/components/Button';
import { Modal } from '@/view/components/Modal';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { useFiltersModal } from './useFiltersModal';

type FiltersModalProps = {
  open: boolean;
  onClose?: () => void;
};
const mockedbankAccount = [
  { id: '1', name: 'Nubank' },
  { id: '2', name: 'XP Investimentos' },
  { id: '3', name: 'Next' },
];

export const FiltersModal: FC<FiltersModalProps> = ({ onClose, open }) => {
  const {
    handleSelectionBankAccountId,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
  } = useFiltersModal();
  return (
    <Modal open={open} onClose={onClose} title='Filtros'>
      <div>
        <span className='text-lg font-bold tracking-[-1px] mt-2 text-gray-800'>
          Conta
        </span>
        <div className='mt-2 space-y-2'>
          {mockedbankAccount.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectionBankAccountId(account.id)}
              className={cn(
                'p-2 rounded-2xl w-full text-left hover:bg-gray-100 transition-colors',
                selectedBankAccountId === account.id && '!bg-gray-200'
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-10 text-gray-800'>
        <span className='text-lg font-bold tracking-[-1px]'>Ano</span>

        <div className='mt-2 w-52 flex items-center justify-between'>
          <button
            onClick={() => handleChangeYear(-1)}
            className='w-12 h-12 flex items-center justify-center'
          >
            <ChevronLeftIcon className='w-6 h-6' />
          </button>
          <span className='flex-1 text-center text-sm font-medium tracking-[-0.5px]'>
            {selectedYear}
          </span>
          <button
            onClick={() => handleChangeYear(1)}
            className='w-12 h-12 flex items-center justify-center'
          >
            <ChevronRightIcon className='w-6 h-6' />
          </button>
        </div>
      </div>
      <Button className='w-full mt-10'>Aplicar Filtros</Button>
    </Modal>
  );
};
