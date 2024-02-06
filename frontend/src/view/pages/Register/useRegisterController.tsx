import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { authService } from '../../../app/services/authService';
import { useMutation } from '@tanstack/react-query';
import { SignUpRequest } from '../../../app/services/authService/signup';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/hooks/useAuth';

const schema = z.object({
  name: z.string().min(1, 'name mandatory'),
  email: z.string().min(1, 'email mandatory').email('invalid email'),
  password: z
    .string()
    .min(1, 'password mandatory')
    .min(8, 'password must contain at least 8 characters'),
});

type FormData = z.infer<typeof schema>

export const useRegisterController = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });


  const { mutateAsync, isPending } = useMutation({
    // mutationKey: ['signup-user'],
    mutationFn: async (data: SignUpRequest) => {
      return authService.signup(data)
    },
  });

  const { signIn } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signIn(accessToken)
      toast.success("Login success!")
    } catch {
      toast.error("Connection refused!")
    }
    // mutate()
  });
  return { register, errors, onSubmit, isPending };
}
