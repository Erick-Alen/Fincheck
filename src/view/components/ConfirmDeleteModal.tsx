import { Button } from './Button';
import { Modal } from './Modal'
import { TrashIcon } from './icons/TrashIcon';

type ConfirmDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  isPending?: boolean;
};

export const ConfirmDeleteModal = ({
  onConfirm,
  onClose,
  title,
  description,
  isPending
}: ConfirmDeleteModalProps) => {
  return (
    <Modal onClose={onClose} open title='Delete account'>
      <div className='flex flex-col items-center justify-center text-center gap-6'>
        <div className='w-[52px] h-[52px] bg-red-50 flex items-center justify-center rounded-full'>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </div>
        <p className='w-[180px] text-gray-800 font-bold tracking-[-0.5px]'>
          {title}
        </p>
        {description && (
          <p className='w-[280px] text-gray-800 tracking-[-0.5px]'>
            {description}
          </p>
        )}
      </div>
      <div className='mt-10 flex flex-col space-y-4'>
        <Button variant='danger' onClick={onConfirm} isPending={isPending}>
          Yes, delete
        </Button>
        <Button variant='ghost' onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
