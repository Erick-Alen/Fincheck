import { useQuery } from '@tanstack/react-query';
import { bankAccountsService } from '../services/bankAccountsService';

export const useBankAccounts = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
    enabled: true
  });

  return { accounts: data ?? [], isFetching, refetch };
};
