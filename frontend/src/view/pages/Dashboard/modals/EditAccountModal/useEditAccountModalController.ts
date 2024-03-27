import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboardContext'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccountsService } from '@/app/services/bankAccountService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import toast from 'react-hot-toast';
import { useState } from 'react';

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

  //REACT HOOK FORM DATA
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  //EDIT ACCOUNT MUTATION
  const queryClient = useQueryClient();
  const { mutateAsync: updateAccount, isPending: isPendingUpdateAccount } = useMutation({mutationFn: bankAccountsService.update}) // tanstack-v5
  // const { mutateAsync } = useMutation(bankAccountsService.create) tanstack-v4

  const onSubmit = handleSubmit(async (data) => {
    try {
      updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id
        // typescript non null assertion operator
        // enforcing that the value is not null or undefined
      })
      toast.success('Account updated successfully');
      // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.ACCOUNTS]})
      reset();
      //TODO: fix react query invalidate queries
      queryClient.invalidateQueries({queryKey: ['bankAccounts']})
      closeEditAccountModal();
      // not necessary, component is being unmounted
    } catch {
      toast.error('Error updating account')
    }
  });


  const handleOpenDeleteModal = async () => {
    setIsDeleteModalOpen(true)
  }
  const handleCloseDeleteModal = async () => {
    setIsDeleteModalOpen(false)
  }
  const { mutateAsync: removeAccount, isPending: isPendingDeleteAccount } = useMutation({mutationFn: bankAccountsService.remove}) // tanstack-v5
  const handleDeleteAccount = async () => {
    try {
      removeAccount(accountBeingEdited!.id)
      // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.ACCOUNTS]})
      queryClient.invalidateQueries({queryKey: ['bankAccounts']})
      closeEditAccountModal();
      toast.success('Account deleted successfully');
    } catch {
      toast.error('Error deleting account')
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isDeleteModalOpen,
    accountBeingEdited,
    register,
    control,
    errors,
    onSubmit,
    isPendingUpdateAccount,
    isPendingDeleteAccount
  };
}
