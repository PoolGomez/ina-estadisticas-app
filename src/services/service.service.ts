import { Service } from "@/models/service.model";
import { ResponseService } from "@/models/responseService.model";

interface responseServices{
  code: string;
  message: string;
  data: Service[]
}
interface responseService{
  code: string;
  message: string;
  data: Service
}


// const api = "http://localhost:3100/api/v1/services/";
const api = import.meta.env.VITE_URL_BACKEND + "/api/v1/services/"

export const createService = async (
  service: Omit<Service, "id">
): Promise<ResponseService> => {
  const data = {
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
  };
  const result = await fetch(api, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json", // Indica que el cuerpo es JSON
    },
    body: JSON.stringify(data),
  });
  const res = await result.json();
  if (res.code === "success") {
    return res;
  } else if (res.code === "warning") {
    throw new Error(res.message);
  } else {
    throw new Error("Ocurrio un Error");
  }

  // const isUnique = await checkNroBoletaCreate(service.boleta);
  // if(!isUnique) throw new Error('El número de boleta debe ser único')

  // const docRef = await addDoc(collection(db,servicesCollection), service);
  // return{id: docRef.id, ...service}
};
export const updateService = async (
  id: string,
  service: Partial<Omit<Service, "id">>
): Promise<ResponseService> => {
  const resultl = await fetch(api + id, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json", // Indica que el cuerpo es JSON
    },
    body: JSON.stringify(service),
  });
  const res = await resultl.json();
  if (res.code === "success") {
    return res;
  } else if (res.code === "warning") {
    throw new Error(res.message);
  } else {
    throw new Error("Ocurrio un Error");
  }
  // if(service.boleta){
  //   const isUnique = await checkNroBoletaUpdate(id, service.boleta);
  //   if(!isUnique) throw new Error('Ya existe en nro de boleta en otro servicio');
  // }
  // const docRef = doc(db, servicesCollection, id);
  // await updateDoc(docRef, service);
};

// export const checkNroBoletaCreate = async (boleta: string): Promise<boolean> => {
//     const q = query(collection(db, servicesCollection) , where('boleta','==', boleta));
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.empty;
// }

export const getServices = async (): Promise<responseServices> => {
  const result = await fetch(api, {
    method: "GET",
    credentials: "include",
    // headers:{
    //   'Authorization':`Bearer ${token}`
    // }
  });
  // const res = await result.json();
  // console.log(res)
  // if(res.code === "error" && res.message === "No existe el token"){
  //   await signOut(auth);
  //   navigate("/login");
  //   return []
  // }
  return (await result.json()) as responseServices;
  // return (await result.json()) as Service[];

  // const querySnapshot = await getDocs(collection(db,servicesCollection));
  // return querySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // })) as Service[];
};

export const getServiceById = async (id: string): Promise<responseService> => {
  const result = await fetch(api + id, {
    method: "GET",
    credentials: "include",
  });
  return (await result.json()) as responseService;

  // const docRef = doc(db, servicesCollection, id);
  // const docSnap = await getDoc(docRef);
  // console.log("llamada useCase")
  // if(!docSnap.exists()) return null;
  // return {
  //   id: docSnap.id,
  //   ...docSnap.data(),
  // } as Service;
};

export const deleteService = async (id: string): Promise<void> => {
  await fetch(api + id, {
    method: "DELETE",
    credentials: "include",
  });

  // const docRef = doc(db, servicesCollection, id);
  // await deleteDoc(docRef);
};

// export const checkNroBoletaUpdate = async (id: string, boleta: string): Promise<boolean> => {
//   const q = query(collection(db, servicesCollection) , where('boleta','==', boleta));
//   const querySnapshot = await getDocs(q);
//   for(const doc of querySnapshot.docs){
//     if(doc.id !== id){
//       return false;
//     }
//   }
//   return true;
// }
