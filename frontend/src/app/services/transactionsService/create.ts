import { httpClient } from '../httpClient';

export type CreateTransactionsParams = {
  value: number,
  name: string,
  categoryId: string,
  bankAccountId: string,
  date: string,
  type: 'INCOME' | 'OUTCOME'
}

export const create = async (params: CreateTransactionsParams) => {
  // await sleep()
  const { data } = await httpClient.post('/Transactions', params);
  return data;
}
