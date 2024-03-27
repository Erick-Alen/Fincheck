import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactionsService';

export const useTransactions = () => {
  const { data, isPending, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll({
      month: 2,
      year: 2024
    }),
  });

  return { transactions: data ?? [], isPending, isLoading };
};
