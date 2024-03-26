import { httpClient } from '../httpClient';

export type BankAccountParams = {
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
}

export const create = async (params: BankAccountParams) => {
  // await sleep()
  const { data } = await httpClient.post('/bank-account', params)
  return data;
}
