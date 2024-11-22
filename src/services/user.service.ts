
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { UserInfo } from "@/models";

export const addUser = (user: UserInfo) => {
  
    const userRef = doc(db, "users", user.id);
    return setDoc(userRef, {
      name: user.name,
      email: user.email,
      role: user.role
    })
    // return addDoc(collection(db, "users"), user);
};

export const getUser = async (id: string) => {
  const docRef = doc(db, "users", id);

  const result = await getDoc(docRef);
  const user = {
    id: result.id,
    ...result.data()
  }

  return user as UserInfo
}
  
export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as unknown as UserInfo[];
};


export const updateUser = (id: string, user: Partial<UserInfo>) => {
  const userRef = doc(db, "users", id);
  return updateDoc(userRef, user);
};

export const deleteUser = (id: string) => {
  const userRef = doc(db, "users", id);
  return deleteDoc(userRef);
};