import { remove } from './delete';
import { update } from './update';
import { getAll } from './getAll';
import { create } from './create'
export const transactionsService = {
  create, getAll, update, remove
}
