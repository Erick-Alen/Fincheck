import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactionsService';
import { TransactionsFilters } from '../services/transactionsService/getAll';

export const useTransactions = (filters: TransactionsFilters) => {
  const { data, isPending, refetch, isFetching } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters),
  });

  return { transactions: data ?? [], isPending, refetch, isFetching };
};
