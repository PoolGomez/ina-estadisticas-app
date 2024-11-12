import { useQuery } from '@tanstack/react-query';
import { Service } from '@/domain/models/Service';
import { getServices } from '@/application/useCases/getServices';

export const useServices = () => {
  return useQuery<Service[]>({
    queryKey: ["services"], 
    queryFn: getServices,
    // enabled:false
  });
};



