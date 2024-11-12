import { useMutation } from '@tanstack/react-query';
import { login, register, logout } from '../services/authService';
// import { useEffect, useState } from 'react';
// import { onAuthStateChanged, User } from 'firebase/auth';
// import { auth } from '@/config/firebase';

export const useLogin = ()=> useMutation(  {mutationFn:({email, password}:{email: string, password: string} ) => login(email, password)});
export const useRegister = () => useMutation({ mutationFn:({ email, password }: { email: string; password: string }) => register(email, password)});
export const useLogout = () => useMutation({mutationFn:() => logout()});

// Hook para escuchar el estado de autenticación
// export const useAuth = () => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//         setUser(currentUser);
//         setLoading(false);
//       });
  
//       return () => unsubscribe();
//     }, []);
  
//     return { user, loading };
//   };