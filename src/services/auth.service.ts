import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { FirebaseError } from "firebase/app";

export const registerUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    const response = {
      code: "OK",
      message: "Login Correcto",
      user: {
        id: result.user.uid,
        name: 'Paul', //result.user.displayName,
        email: 'pgomez@gmail.com', //result.user.email,
        role: "admin"
      }
    };
    return response;

  } catch (err : unknown) {
    // console.log("[result]", error.code);
    const error = err as FirebaseError;
    console.log("[code]", error.code);
    console.log("[message]", error.message);
    console.log("[name]", error.name);
    console.log("[customData]", error.customData);
    return {
      code:"ERROR",
      message: error.code,
      user: null
    }
  }
  



  // return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};