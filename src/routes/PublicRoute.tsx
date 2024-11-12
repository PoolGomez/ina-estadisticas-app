import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const [user,isLoading] = useAuthState(auth);

  if (isLoading) return <p>Loading...</p>;

  return user ? <Navigate to="/dashboard" replace/> : <>{children}</>

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  // return <>{children}</>;
};