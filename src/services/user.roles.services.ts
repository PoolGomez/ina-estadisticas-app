import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"

export const fetchUserRoles = async( uid: string): Promise<string | null> => {
    const userDoc = doc(db,'users',uid);
    const userSnapShot = await getDoc(userDoc);

    if(!userSnapShot.exists()){
        console.error("usuario no existe en firestore")
        return null;
    }
    return userSnapShot.data().rol;
}