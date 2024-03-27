import { useQuery } from '@tanstack/react-query';
import { bankAccountsService } from '../services/bankAccountsService';

export const useBankAccounts = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
  });

  return { accounts: data ?? [], isFetching };
};
