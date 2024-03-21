import { Modal } from '@/view/components/Modal';
import { useNewAccountModalController } from './useNewAccountModalController';
import InputCurrency from '@/view/components/InputCurrency';
import { Input } from '@/view/components/Input';
import { Select } from '@/view/components/Select';

const NewAccountModal = () => {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController();
  return (
    <Modal
      title='Nova Conta'
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <div className='mt-10 flex flex-col gap-4'>
          <span className='text-gray-600 tracking-[0.5px] text-xs'>Saldo</span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[0.5px] text-lg'>R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className='flex flex-col mt-10 gap-4'>
          <Input type='text' name='name' placeholder='Nome da conta' />
          <Select
            // error='Select a field'
            placeholder='Tipo'
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
        </div>
      </form>
    </Modal>
  );
};

export default NewAccountModal;
