import { httpClient } from '../httpClient';

type BankAccountsResponse = Array<{
  color: string,
  name: string,
  id: string,
  initialBalance: number,
  currentBalance: number,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
  }>

export const getAll = async () => {
  // await sleep()
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts');
  return data;
}
