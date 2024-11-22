import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { addUser, getUser } from "./user.service";
import { UserInfo } from "@/models";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password );

    const newUser = {
      id: userCredentials.user.uid,
      name : name,
      email: email,
      role : "user",
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
      message: error.code,
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
        role: user.role
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