import { Modal } from '@/view/components/Modal';
import { useNewTransactionModalController } from './useNewTransactionModalController';
import { InputCurrency } from '@/view/components/InputCurrency';
import { Input } from '@/view/components/Input';
import { Select } from '@/view/components/Select';
import { DatePickerInput } from '@/view/components/DatePickerInput';

const NewTransactionModal = () => {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useNewTransactionModalController();
  const isIncome = newTransactionType === 'INCOME';
  return (
    <Modal
      title={isIncome ? 'Nova Receita' : 'Nova Despesa'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div className='mt-10 flex flex-col gap-4'>
          <span className='text-gray-600 tracking-[0.5px] text-xs'>
            {isIncome ? 'Da receita' : 'Da despesa'}
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[0.5px] text-lg'>R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className='flex flex-col mt-10 gap-4'>
          <Input
            type='text'
            name='name'
            placeholder={isIncome ? 'Nome da receita' : 'Nome da despesa'}
          />
          <Select
            // error='Select a field'
            placeholder='Categoria'
            options={[
              {
                value: 'CHECKING',
                label: 'Conta corrente',
              },
              {
                value: 'INVESTMENT',
                label: 'Investimento',
              },
              {
                value: 'CASH',
                label: 'Dinheiro',
              },
            ]}
          />
          <Select
            // error='Select a field'
            placeholder={isIncome ? 'Receber com' : 'Pagar com'}
            options={[
              {
                value: 'CHECKING',
                label: 'Conta corrente',
              },
              {
                value: 'INVESTMENT',
                label: 'Investimento',
              },
              {
                value: 'CASH',
                label: 'Dinheiro',
              },
            ]}
          />
          {/* <ColorsDropdownInput /> */}
          <DatePickerInput/>
        </div>
      </form>
    </Modal>
  );
};

export default NewTransactionModal;
