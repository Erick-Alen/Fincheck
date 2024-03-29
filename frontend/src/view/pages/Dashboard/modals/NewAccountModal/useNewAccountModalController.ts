import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboardContext'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccountsService } from '@/app/services/bankAccountsService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/app/config/constants';

const schema = z.object({
  name: z.string().min(1, 'Account name is mandatory'),
  initialBalance: z.string().min(1, 'The initial balance is mandatory'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Color mandatory')
})

type FormData =z.infer<typeof schema>

export const useNewAccountModalController = () => {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })


  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({mutationFn: bankAccountsService.create}) // tanstack-v5
  // const { mutateAsync } = useMutation(bankAccountsService.create) tanstack-v4
    const onSubmit = handleSubmit(async (data) => {
      try {
        await mutateAsync({
          ...data,
          initialBalance: currencyStringToNumber(data.initialBalance)
        })

        toast.success('Account created successfully');
        queryClient.invalidateQueries({queryKey: QUERY_KEYS.BANK_ACCOUNTS})
        closeNewAccountModal();
        reset();
      } catch {
        toast.error('Error creating account')
      }
  });

  return { isNewAccountModalOpen, closeNewAccountModal, register, control, errors, onSubmit, isPending };
}
