import { httpClient } from '../httpClient';

export type CategoriesParams = {
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
}

export const create = async (params: CategoriesParams) => {
  // await sleep()
  const { data } = await httpClient.post('/categories', params);
  return data;
}
