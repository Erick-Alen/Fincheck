import { httpClient } from '../httpClient';

export type BankAccountParams = {
  id: string,
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
}

export const update = async ({id, ...params}: BankAccountParams): Promise<BankAccountParams> => {
  // await sleep()
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);
  return data;
}
