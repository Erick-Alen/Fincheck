import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactionsService';
import { TransactionsFilters } from '../services/transactionsService/getAll';
import { QUERY_KEYS } from '../config/constants';

export const useTransactions = (filters: TransactionsFilters) => {
  const { data, isPending, refetch, isFetching } = useQuery({
    queryKey: QUERY_KEYS.TRANSACTIONS,
    queryFn: () => transactionsService.getAll(filters),
  });

  return { transactions: data ?? [], isPending, refetch, isFetching };
};
