import { httpClient } from '../httpClient';

export type UpdateTransactionsParams = {
  id: string,
  name: string,
  bankAccountId: string,
  categoryId: string,
  value: number,
  date: string,
  type: 'INCOME' | 'OUTCOME'
}

export const update = async ({id, ...params}: UpdateTransactionsParams) => {
  // await sleep()
  const { data } = await httpClient.put(`/transactions/${id}`, params);
  return data;
}
