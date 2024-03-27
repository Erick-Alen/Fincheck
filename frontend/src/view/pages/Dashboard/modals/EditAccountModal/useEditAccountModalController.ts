import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboardContext'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccountsService } from '@/app/services/bankAccountService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Account name is mandatory'),
  initialBalance: z.union([
    z.string().min(1, 'The initial balance is mandatory'),
    z.number()
  ]),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Color mandatory')
})

type FormData =z.infer<typeof schema>

export function useEditAccountModalController () {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } = useDashboard();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: accountBeingEdited?.name,
      initialBalance: accountBeingEdited?.currentBalance,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color
    }
  })


  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({mutationFn: bankAccountsService.update}) // tanstack-v5
  // const { mutateAsync } = useMutation(bankAccountsService.create) tanstack-v4
    const onSubmit = handleSubmit(async (data) => {
      try {
        mutateAsync({
          ...data,
          initialBalance: currencyStringToNumber(data.initialBalance),
          id: accountBeingEdited!.id
          // typescript non null assertion operator
          // enforcing that the value is not null or undefined
        })

        toast.success('Account updated successfully');
        // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.ACCOUNTS]})
        queryClient.invalidateQueries({queryKey: ['bankAccounts']})
        closeEditAccountModal();
        reset();
        // not necessary, component is being unmounted
      } catch {
        toast.error('Error updating account')
      }
  });

  return { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited, register, control, errors, onSubmit, isPending };
}
