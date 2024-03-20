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
        <div>
          <span className='text-gray-600 tracking-[0.5px] text-xs'>Saldo</span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[0.5px] text-lg'>R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className='mt-10'>
          <Input type='text' name='name' placeholder='Nome da conta' />
          <Select />
        </div>
      </form>
    </Modal>
  );
};

export default NewAccountModal;
