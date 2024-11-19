import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, 
    // DocumentData 
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Product } from "@/models";

export const addProduct = (product: Product) => {
  return addDoc(collection(db, "products"), product);
};

export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[];
};

export const updateProduct = (id: string, product: Partial<Product>) => {
  const productRef = doc(db, "products", id);
  return updateDoc(productRef, product);
};

export const deleteProduct = (id: string) => {
  const productRef = doc(db, "products", id);
  return deleteDoc(productRef);
};