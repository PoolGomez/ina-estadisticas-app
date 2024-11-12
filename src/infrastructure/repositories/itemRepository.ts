import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Item } from '../../domain/models/Item';

export const getItemsRepository = async (): Promise<Item[]> => {
  const querySnapshot = await getDocs(collection(db, 'items'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Item[];
};