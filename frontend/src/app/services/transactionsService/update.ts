import { httpClient } from '../httpClient';

export type TransactionsParams = {
  id: string,
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
}

export const update = async ({id, ...params}: TransactionsParams) => {
  // await sleep()
  const { data } = await httpClient.put(`/transactions/${id}`, params);
  return data;
}
