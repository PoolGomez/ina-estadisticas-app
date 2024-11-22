
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Service } from "@/models/service.model";

export const addService = (service: Service) => {
    const newService = {
        boleta: service.boleta,
        congregacion: service.congregacion,
        fecha: service.fecha,
        mes: service.mes,
        escuelaDominical: service.escuelaDominical,
        invitados: service.invitados,
        miembros: service.miembros,
        asistencia: service.asistencia,
        oficiante: service.oficiante,
        ofrenda: service.ofrenda,
        observacion: service.observacion,
    }
    return addDoc(collection(db, "servicios"), newService);
};
  
export const getServices = async () => {
    const snapshot = await getDocs(collection(db, "servicios"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Service[];
};

export const updateService = (id: string, service: Partial<Service>) => {
    const serviceRef = doc(db, "servicios", id);
    return updateDoc(serviceRef, service);
};

export const deleteService = (id: string) => {
    const serviceRef = doc(db, "servicios", id);
    return deleteDoc(serviceRef);
};