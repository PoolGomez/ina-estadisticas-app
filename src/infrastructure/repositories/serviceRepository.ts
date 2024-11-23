// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../config/firebase';
import { Service } from '@/domain/models/Service';
import { checkNroBoleta, createService, deleteService, getServiceById, getServices, updateService } from '@/application/useCases/serviceUseCases';

// export const getServicesRepository = async (): Promise<Service[]> => {
//   const querySnapshot = await getDocs(collection(db, 'servicios'));
//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as Service[];
// };

export class ServiceRepository {

  async create(service: Omit<Service, 'id'>): Promise<Service>{
    return createService(service)
  }

  async findAll(): Promise<Service[]>{
    return getServices();
  }

  async findById(id: string): Promise<Service | null>{
    return getServiceById(id);
  }

  async update(id: string, service: Partial<Omit<Service, 'id'>>) : Promise<void>{
    return updateService(id, service)
  }
  async delete(id: string) : Promise<void>{
    return deleteService(id);
  }
  async isBoletaUnique(boleta: string): Promise<boolean>{
    return checkNroBoleta(boleta);
  }
}