import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { addUser, getUser } from "./user.service";
import { UserInfo } from "@/models";
import { FirebaseErrorTranslator } from "@/entities/firebaseErrors";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password );

    const newUser = {
      id: userCredentials.user.uid,
      name : name,
      email: email,
      rol : "user",
    }
    await addUser(newUser as UserInfo)

    return {
      code:"OK",
      message: "Usuario Creado",
      user: newUser
    };
    
  } catch (err) {
    const error = err as FirebaseError;
    console.log("error registerUser")
    console.log(error)
    return {
      code:"ERROR",
      message: FirebaseErrorTranslator.translate(error.code || 'unknown') ,
      user: null
    }
  }

  // return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    const user = await getUser(result.user.uid);

    const response = {
      code: "OK",
      message: "Login Correcto",
      user: {
        id: user.id,
        name: user.name, //'Paul', //result.user.displayName,
        email: user.email, //result.user.email,
        rol: user.rol
      }
    };
    return response;

  } catch (err : unknown) {
    // console.log("[result]", error.code);
    const error = err as FirebaseError;
    return {
      code:"ERROR",
      message: FirebaseErrorTranslator.translate(error.code || 'unknown') ,
      user: null
    }
  }
  



  // return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};