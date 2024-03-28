import { Modal } from '@/view/components/Modal';
import { useNewTransactionModalController } from './useNewTransactionModalController';
import { InputCurrency } from '@/view/components/InputCurrency';
import { Input } from '@/view/components/Input';
import { Select } from '@/view/components/Select';
import { DatePickerInput } from '@/view/components/DatePickerInput';
import { Controller } from 'react-hook-form';
import { Button } from '@/view/components/Button';

export const NewTransactionModal = () => {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    control,
    errors,
    onSubmit,
    register,
    accounts,
    categories,
    isPending
  } = useNewTransactionModalController();
  const isIncome = newTransactionType === 'INCOME';
  return (
    <Modal
      title={isIncome ? 'Nova Receita' : 'Nova Despesa'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={onSubmit}>
        <div className='mt-10 flex flex-col gap-4'>
          <span className='text-gray-600 tracking-[0.5px] text-xs'>
            {isIncome ? 'Da receita' : 'Da despesa'}
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[0.5px] text-lg'>R$</span>
            <Controller
              control={control}
              name='value'
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  onChange={onChange}
                  value={value}
                  error={errors.value?.message}
                />
              )}
            />
          </div>
        </div>
        <div className='flex flex-col mt-10 gap-4'>
          <Input
            error={errors.name?.message}
            type='text'
            placeholder={isIncome ? 'Nome da receita' : 'Nome da despesa'}
            {...register('name')}
          />
          <Controller
            control={control}
            name='categoryId'
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.categoryId?.message}
                value={value}
                onChange={onChange}
                placeholder='Categoria'
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />
          <Controller
            control={control}
            name='bankAccountId'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.bankAccountId?.message}
                value={value}
                onChange={onChange}
                placeholder={isIncome ? 'Receber com' : 'Pagar com'}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />
          {/* <ColorsDropdownInput /> */}
          <Controller
            control={control}
            name='date'
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
        <Button isPending={isPending} type='submit' className='w-full mt-6'>
          Create
        </Button>
      </form>
    </Modal>
  );
};
