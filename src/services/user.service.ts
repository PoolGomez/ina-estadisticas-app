
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { UserInfo } from "@/models";

const usersCollection = "users";

export const addUser = async (user: UserInfo) :Promise<void> => {
  
    const userRef = doc(db, usersCollection, user.id);
    return setDoc(userRef, {
      name: user.name,
      email: user.email,
      rol: user.rol
    })
    // return addDoc(collection(db, "users"), user);
};

export const getUser = async (id: string): Promise<UserInfo> => {
  const docRef = doc(db, usersCollection, id);

  const result = await getDoc(docRef);
  const user = {
    id: result.id,
    ...result.data()
  }

  return user as UserInfo
}
  

export const getUsers = async ():Promise<UserInfo[]> => {
  const snapshot = await getDocs(collection(db, usersCollection));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as UserInfo[];
};


export const updateUser = (id: string, user: Partial<UserInfo>) => {
  const userRef = doc(db, usersCollection, id);
  return updateDoc(userRef, user);
};

export const updateRolUser = (id: string, rol: string) => {
  const userRef = doc(db, usersCollection, id);
  return updateDoc(userRef,{rol: rol})
}

export const deleteUser = (id: string) : Promise<void> => {
  const userRef = doc(db, usersCollection, id);
  return deleteDoc(userRef);
};