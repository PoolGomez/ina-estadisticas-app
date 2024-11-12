import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Service } from '@/domain/models/Service';

export const getServicesRepository = async (): Promise<Service[]> => {
  const querySnapshot = await getDocs(collection(db, 'servicios'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Service[];
};