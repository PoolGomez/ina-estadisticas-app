import { Service } from '@/domain/models/Service';
import { getServicesRepository } from '@/infrastructure/repositories/serviceRepository';

export const getServices = async (): Promise<Service[]> => {
  return await getServicesRepository();
};