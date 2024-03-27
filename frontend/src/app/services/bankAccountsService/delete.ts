import { httpClient } from '../httpClient';

export const remove = async (bankAccountId: string) => {
  // await sleep()
  const { data } = await httpClient.delete(`/bank-accounts/${bankAccountId}`);
  return data;
}
