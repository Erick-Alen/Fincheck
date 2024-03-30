import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '../services/categoriesService';
import { QUERY_KEYS } from '../config/constants';

export const useCategories = () => {
  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: categoriesService.getAll,
  });

  return { categories: data ?? [], isFetching };
};
