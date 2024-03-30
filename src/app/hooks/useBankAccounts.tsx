import { useQuery } from '@tanstack/react-query';
import { bankAccountsService } from '../services/bankAccountsService';
import { QUERY_KEYS } from '../config/constants';

export const useBankAccounts = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: QUERY_KEYS.BANK_ACCOUNTS,
    queryFn: bankAccountsService.getAll,
    enabled: true,
    staleTime: Infinity
  });

  return { accounts: data ?? [], isFetching, refetch };
};
