import { getItemsRepository } from '../../infrastructure/repositories/itemRepository';
import { Item } from '../../domain/models/Item';

export const getItems = async (): Promise<Item[]> => {
  return await getItemsRepository();
};