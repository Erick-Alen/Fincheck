import { httpClient } from '../httpClient';
import { Category } from '@/app/entities/Category';

type CategoriesResponse = Array<Category>

export const getAll = async () => {
  // await sleep()
  const { data } = await httpClient.get<CategoriesResponse>('/categories');
  return data;
}
