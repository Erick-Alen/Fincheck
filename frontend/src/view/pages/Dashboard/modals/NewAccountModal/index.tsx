import { Modal } from '@/view/components/Modal';
import { useNewAccountModalController } from './useNewAccountModalController';

const NewAccountModal = () => {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController();
  return (
    <Modal
      title='Nova Conta'
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      NewAccountModal
    </Modal>
  );
};

export default NewAccountModal;
