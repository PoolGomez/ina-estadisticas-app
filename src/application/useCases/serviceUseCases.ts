import { Service } from "@/models/service.model";
import { db } from "@/services";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";


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

  export const getServiceById = async (id: string) : Promise<Service | null> => {
    const docRef = doc(db, servicesCollection, id);
    const docSnap = await getDoc(docRef);
    console.log("llamada useCase")
    if(!docSnap.exists()) return null;
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Service;
  }
  
export const updateService = async (id: string, service: Partial<Omit<Service, 'id'>>): Promise<void> => {
  if(service.boleta){
    const isUnique = await checkNroBoletaUpdate(id, service.boleta);
    if(!isUnique) throw new Error('Ya existe en nro de boleta en otro servicio');
  }
  const docRef = doc(db, servicesCollection, id);
  await updateDoc(docRef, service);
};

export const deleteService = async (id: string): Promise<void> => {
  
    const docRef = doc(db, servicesCollection, id);
    await deleteDoc(docRef)
    // .then(()=>{
    //   console.log("borrado correcto")
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  


// await deleteDoc(docRef);
};

export const checkNroBoletaUpdate = async (id: string, boleta: string): Promise<boolean> => {
  const q = query(collection(db, servicesCollection) , where('boleta','==', boleta));
  const querySnapshot = await getDocs(q);
  for(const doc of querySnapshot.docs){
    if(doc.id !== id){
      return false;
    }
  }
  return true;
  // return querySnapshot.empty;
}