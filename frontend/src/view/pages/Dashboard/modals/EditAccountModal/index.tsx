import { Modal } from '@/view/components/Modal';
import { useEditAccountModalController } from './useEditAccountModalController';

import { Input } from '@/view/components/Input';
import { Select } from '@/view/components/Select';
import { ColorsDropdownInput } from '@/view/components/ColorsDropdownInput';
import { Button } from '@/view/components/Button';
import { Controller } from 'react-hook-form';
import { InputCurrency } from '@/view/components/InputCurrency';
import { TrashIcon } from '@/view/components/icons/TrashIcon';
import { ConfirmDeleteModal } from '@/view/components/ConfirmDeleteModal';

const EditAccountModal = () => {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteAccount,
    isDeleteModalOpen,
    register,
    control,
    errors,
    onSubmit,
    isPendingDeleteAccount,
    isPendingUpdateAccount
  } = useEditAccountModalController();
  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        title='Are you sure you want to delete this account?'
        description='When excluding this account, all related data will be deleted'
        isPending={isPendingDeleteAccount}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
      />
    );
  }
    return (
      <Modal
        title='Edit Account'
        open={isEditAccountModalOpen}
        onClose={closeEditAccountModal}
        rightAction={
          <button onClick={handleOpenDeleteModal}>
            <TrashIcon className='w-6 h-6 text-red-600' />
          </button>
        }
      >
        <form onSubmit={onSubmit}>
          <div className='mt-10 flex flex-col gap-4'>
            <span className='text-gray-600 tracking-[0.5px] text-xs'>
              Saldo
            </span>
            <div className='flex items-center gap-2'>
              <span className='text-gray-600 tracking-[0.5px] text-lg'>R$</span>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <InputCurrency
                    error={errors.initialBalance?.message}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name='initialBalance'
                control={control}
                defaultValue={'0'}
              />
            </div>
          </div>
          <div className='flex flex-col mt-10 gap-4'>
            <Input
              type='text'
              placeholder='Nome da conta'
              error={errors.name?.message}
              {...register('name')}
            />
            <Controller
              name='type'
              defaultValue='INVESTMENT'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  error={errors.type?.message}
                  value={value}
                  onChange={onChange}
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
              )}
            />
            <Controller
              name='color'
              defaultValue=''
              control={control}
              render={({ field: { onChange, value } }) => (
                <ColorsDropdownInput
                  onChange={onChange}
                  value={value}
                  error={errors.color?.message}
                />
              )}
            />
          </div>
          <Button
            isPending={isPendingUpdateAccount}
            type='submit'
            className='w-full mt-6'
          >
            Save changes
          </Button>
        </form>
      </Modal>
    );
};

export default EditAccountModal;
