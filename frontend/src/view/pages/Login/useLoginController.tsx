import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod'

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

  const onSubmit = handleSubmit((data) => {
    const { success } = schema.safeParse(data);
    if (errors) {
      console.log(errors)
    }
  });
  return { onSubmit, register, errors };
};
