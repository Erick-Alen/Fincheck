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
import { Transaction } from '@/app/entities/Transaction';

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
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  const { isPending, mutateAsync } = useMutation({ mutationFn: transactionsService.update }) // tanstack-v5

  const queryClient = useQueryClient();
  // const { mutateAsync: updateAccount, isPending: isPendingUpdateAccount } = useMutation({mutationFn: bankAccountsService.create}) // tanstack-v5

  const onSubmit = handleSubmit(async data => {
    console.log(data);
    try {
      mutateAsync({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      })
      toast.success('Transaction created successfully');
      // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TRANSACTIONS]})
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      onClose();
    } catch {
      toast.error('Error updating transaction');
    }

  })

  return {
    // isNewTransactionModalOpen,
    // closeNewTransactionModal,
    // newTransactionType,
    register,
    control,
    onSubmit,
    errors,
    accounts,
    categories,
    isPending: false
  };
}
