import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboardContext'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bankAccountsService } from '@/app/services/bankAccountsService';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useCategories } from '@/app/hooks/useCategories';
import { useMemo } from 'react';
import { transactionsService } from '@/app/services/transactionsService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.string().min(1, 'value mandatory'),
  name: z.string().min(1, 'name mandatory'),
  categoryId: z.string().min(1, 'category mandatory'),
  bankAccountId: z.string().min(1, 'bankAccountId mandatory'),
  date: z.date()
})

export const useNewTransactionModalController = () => {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } = useDashboard();
  // typing the react hok forma formdata
  type FormData = z.infer<typeof schema>

    // creating the REACT HOOK FORM
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType)
  }, [categoriesList, newTransactionType])

  const { isPending, mutateAsync } = useMutation({ mutationFn: transactionsService.create }) // tanstack-v5

  const queryClient = useQueryClient();
  // const { mutateAsync: updateAccount, isPending: isPendingUpdateAccount } = useMutation({mutationFn: bankAccountsService.create}) // tanstack-v5

  const onSubmit = handleSubmit(async data => {
    try {
      mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      })
      toast.success('Transaction created successfully');
      // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TRANSACTIONS]})
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      reset();
      closeNewTransactionModal();
    } catch {
      toast.error('Error creating transaction');
    }

  })

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    onSubmit,
    errors,
    accounts,
    categories,
    isPending
  };
}
