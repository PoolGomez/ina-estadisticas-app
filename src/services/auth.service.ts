import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { FirebaseError } from "firebase/app";
// import { addUser } from "./user.service";
// import { UserInfo } from "@/models";
import { FirebaseErrorTranslator } from "@/entities/firebaseErrors";

// const api = "https://ina-estadisticas-backend.onrender.com/api/v1/auth/";
// const api = "http://localhost:3100/api/v1/auth/login";
const api = import.meta.env.VITE_URL_BACKEND + "/api/v1/auth"

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password );

    const newUser = {
      id: userCredentials.user.uid,
      name : name,
      email: email,
      rol : "user",
    }
    const response = await fetch(api + '/register',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json", // Indica que el cuerpo es JSON
      },
      body: JSON.stringify(newUser)
    })
    return await response.json();

    // await addUser(newUser as UserInfo)
    // return {
    //   code:"OK",
    //   message: "Usuario Creado",
    //   user: newUser
    // };
    
  } catch (err) {
    const error = err as FirebaseError;
    // console.log("error registerUser")
    // console.log(error)
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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const idToken = await userCredential.user.getIdToken()

    const response = await fetch(api + '/login', {
      method: 'POST',
      credentials: 'include',
      // headers:{
      //   'Content-Type':'application/json',
      // },
      headers:{
        'Authorization':`Bearer ${idToken}`
      }
      // body: JSON.stringify({ token: idToken}),
      
    })

    const data = await response.json();

    // const user = await getUser(userCredential.user.uid);

    const result = {
      code:'OK',
      message: "Login correcto",
      data: {
        token: data.token,
        info: data.info,
      }
    };
    return result;
    // const response = {
    //   code: "OK",
    //   message: "Login Correcto",
    //   user: {
    //     id: user.id,
    //     name: user.name, //'Paul', //result.user.displayName,
    //     email: user.email, //result.user.email,
    //     rol: user.rol
    //   }
    // };
    // return response;

  } catch (err : unknown) {
    
    const error = err as FirebaseError;
    return {
      code:"ERROR",
      message: FirebaseErrorTranslator.translate(error.code || 'unknown') ,
      data: null
    }
  }
  



  // return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {

  try {
    await fetch(api + '/logout', {
      method: 'POST',
      credentials: 'include'
    })  
    await signOut(auth);

  } catch (error) {
    console.log(error)
  }

};