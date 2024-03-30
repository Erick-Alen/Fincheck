import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod'
import { authService } from '../../../app/services/authService';
import { useMutation } from '@tanstack/react-query';
import { SignInRequest } from '../../../app/services/authService/signin';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/hooks/useAuth';

const schema = z.object({
  email: z.string().min(1, 'email mandatory').email('invalid email'),
  password: z.string().min(1, 'password mandatory').min(8, "password must contain at least 8 characters"),
});

type FormData = z.infer<typeof schema>

export const useLoginController = () => {
  // com o zodResolver, presume-se que os dados do formulário estão válidos
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    // mutationKey: ['signup-user'],
    mutationFn: async (data: SignInRequest) => {
      return authService.signin(data);
    },
  });

  const { signIn } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signIn(accessToken)
      toast.success('logged in!');
    } catch {
      toast.error('Invalid credentials!');
    }
    // mutate()
  });
  return { onSubmit, register, errors, isPending };
};
