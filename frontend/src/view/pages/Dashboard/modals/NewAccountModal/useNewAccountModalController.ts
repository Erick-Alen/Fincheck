import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboardContext'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Account name is mandatory'),
  initialBalance: z.string().min(1, 'The initial balance is mandatory'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Color mandatory')
})

type FormData =z.infer<typeof schema>

export function useNewAccountModalController () {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   name,
    //   initialBalancename,
    //   typename,
    //   colorname,
    // }
  })

    const onSubmit = handleSubmit(async (data) => {
    // try {
      console.log(data);

    // }
    // mutate()
  });

  return { isNewAccountModalOpen, closeNewAccountModal, register, control, errors, onSubmit};
}
