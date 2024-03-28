export type Transaction = {
  id: string;
  name: string;
  categoryId: string;
  bankAccountId: string;
  value: number;
  date: string;
  type: 'INCOME' | 'OUTCOME';
  category?: {
    id: string;
    name: string;
    icon: string;
  }
}
