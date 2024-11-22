import { Service } from "@/models/service.model";
import { db } from "@/services";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";


const servicesCollection = "servicios";

export const checkNroBoleta = async (boleta: string): Promise<boolean> => {
  const q = query(collection(db, servicesCollection) , where('boleta','==', boleta));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}

export const createService = async (service: Omit<Service, 'id'>): Promise<Service> => {
    const isUnique = await checkNroBoleta(service.boleta);
    if(!isUnique) throw new Error('El número de boleta debe ser único')

    const docRef = await addDoc(collection(db,servicesCollection), service);
    return{id: docRef.id, ...service}
}

export const getServices = async (): Promise<Service[]> => {
    const querySnapshot = await getDocs(collection(db,servicesCollection));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Service[];
  };
  
export const updateService = async (id: string, service: Partial<Omit<Service, 'id'>>): Promise<void> => {
  if(service.boleta){
    const isUnique = await checkNroBoleta(service.boleta);
    if(!isUnique) throw new Error('El número de boleta debe ser único');
  }
  const docRef = doc(db, servicesCollection, id);
  await updateDoc(docRef, service);
};

export const deleteService = async (id: string): Promise<void> => {
const docRef = doc(db, servicesCollection, id);
await deleteDoc(docRef);
};