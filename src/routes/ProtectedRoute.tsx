import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user,isLoading] = useAuthState(auth);

  if (isLoading) return <p>Loading...</p>;

  return user ? <>{children}</> : <Navigate to="/login" replace/>

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  // return <>{children}</>;
};