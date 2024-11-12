import { useQuery } from '@tanstack/react-query';
import { getItems } from '../application/useCases/getItems';
import { Item } from '../domain/models/Item';

export const useItems = () => {
  return useQuery<Item[]>({
    queryKey: ["items"], 
    queryFn: getItems,
    // enabled:false
  });
};



