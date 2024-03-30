import { httpClient } from '../httpClient';

export type CategoriesParams = {
  id: string,
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
}

export const update = async ({id, ...params}: CategoriesParams) => {
  // await sleep()
  const { data } = await httpClient.put(`/categories/${id}`, params);
  return data;
}
