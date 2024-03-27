import { httpClient } from '../httpClient';

export type BankAccountParams = {
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
}

export const create = async (params: BankAccountParams): Promise<BankAccountParams> => {
  // await sleep()
  const { data } = await httpClient.post('/bank-accounts', params);
  return data;
}
