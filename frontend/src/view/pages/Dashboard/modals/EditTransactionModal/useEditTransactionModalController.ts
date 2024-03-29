import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useCategories } from '@/app/hooks/useCategories';
import { useMemo, useState } from 'react';
import { transactionsService } from '@/app/services/transactionsService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import { Transaction } from '@/app/entities/Transaction';
import { Category } from '@/app/entities/Category';

const schema = z.object({
  value: z.union([
    z.string().min(1, 'value mandatory'),
    z.number().min(1, 'value mandatory'),
  ]),
  name: z.string().min(1, 'name mandatory'),
  categoryId: z.string().min(1, 'category mandatory'),
  bankAccountId: z.string().min(1, 'bankAccountId mandatory'),
  date: z.date()
})

export const useEditTransactionModalController = (
    transaction: Transaction | null,
    onClose: () => void,
  ) => {
  // typing the react hoOk form formdata
  type FormData = z.infer<typeof schema>

  // creating the REACT HOOK FORM
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction? new Date(transaction.date) : new Date,
    }
  })

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const categories = useMemo(() => {
    return categoriesList.filter((category: Category) => category.type === transaction?.type)
  }, [categoriesList, transaction])

  const { mutateAsync: updateTransaction, isPending: isPendingUpdateTransaction } = useMutation({ mutationFn: transactionsService.update }) // tanstack-v5

  const queryClient = useQueryClient();
  // const { mutateAsync: updateAccount, isPending: isPendingUpdateAccount } = useMutation({mutationFn: bankAccountsService.update}) // tanstack-v5

  const onSubmit = handleSubmit(async data => {
    console.log(data);
    try {
      updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Transaction updated successfully');
      // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TRANSACTIONS]})
      onClose();
    } catch {
      toast.error('Error updating transaction');
    }
  })

  //delete modal logic
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const handleOpenDeleteModal = async () => {
    setIsDeleteModalOpen(true)
  }
  const handleCloseDeleteModal = async () => {
    setIsDeleteModalOpen(false)
  }
  const { mutateAsync: removeTransaction, isPending: isPendingDeleteTransaction } = useMutation({mutationFn: transactionsService.remove}) // tanstack-v5

  const handleDeleteTransaction = async () => {
    try {
      removeTransaction(transaction!.id)
      // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.ACCOUNTS]})
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      onClose();
      toast.success('Transaction deleted successfully');
    } catch {
      toast.error('Error deleting transaction')
    }
  }

  return {
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isDeleteModalOpen,
    register,
    control,
    onSubmit,
    errors,
    accounts,
    categories,
    isPendingUpdateTransaction,
    isPendingDeleteTransaction
  };
}
