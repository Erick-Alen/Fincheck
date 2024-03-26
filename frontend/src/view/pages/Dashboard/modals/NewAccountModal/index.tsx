import { Modal } from '@/view/components/Modal';
import { useNewAccountModalController } from './useNewAccountModalController';

import { Input } from '@/view/components/Input';
import { Select } from '@/view/components/Select';
import { ColorsDropdownInput } from '@/view/components/ColorsDropdownInput';
import { Button } from '@/view/components/Button';
import { Controller } from 'react-hook-form';
import { InputCurrency } from '@/view/components/InputCurrency';

const NewAccountModal = () => {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    control,
    errors,
    onSubmit,
    isPending,
  } = useNewAccountModalController();
  return (
    <Modal
      title='Nova Conta'
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form onSubmit={onSubmit}>
        <div className='mt-10 flex flex-col gap-4'>
          <span className='text-gray-600 tracking-[0.5px] text-xs'>Saldo</span>
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
              // defaultValue='0'
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
        <Button isPending={isPending} type='submit' className='w-full mt-6'>
          Criar
        </Button>
      </form>
    </Modal>
  );
};

export default NewAccountModal;
