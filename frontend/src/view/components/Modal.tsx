import { cn } from '@/app/utils/cn';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onClose?: () => void;
};

export const Modal = ({ children, title, open, rightAction, onClose }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'inset-0 fixed bg-black/75 backdrop-blur-[2px] z-50',
            'data-[state=open]:animate-overlayShow'
          )}
        />
        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl z-50 p-6 space-y-10 w-full max-w-[400px]',
            'data-[state=open]:animate-contentShow',
            'shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]'
          )}
        >
          <header className='h-12 flex justify-between items-center text-gray-800'>
            <button
              onClick={onClose}
              className='w-12 h-12 p-3 flex items-center justify-center outline-none'
            >
              <Cross2Icon className='w-6 h-6' />
            </button>
            <span className='text-lg font-bold tracking-[-1px]'>{title}</span>
            <button
              className={cn(
                'w-12 h-12 p-3 flex items-center justify-center',
                !rightAction && 'cursor-auto'
              )}
            >
              {rightAction}
            </button>
          </header>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
