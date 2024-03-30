import { httpClient } from '../httpClient';

export const remove = async (categoryId: string) => {
  // await sleep()
  const { data } = await httpClient.delete(`/categories/${categoryId}`);
  return data;
}
