import { httpClient } from '../httpClient';

export const remove = async (categoryId: string) => {
  // await sleep()
  const { data } = await httpClient.delete(`/bank-accounts/${categoryId}`);
  return data;
}
