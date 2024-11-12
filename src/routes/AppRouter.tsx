import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';

import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { LayoutPublic } from '@/layouts/LayoutPublic';
import { LayoutPrivate } from '@/layouts/LayoutPrivate';
import { Dashboard } from '@/pages/Dashboard';
import { Services } from '@/pages/Services';
import { Home } from '@/pages/Home';
import { PublicRoute } from './PublicRoute';


const AppRouter: React.FC = () => {
  return (
    <div className='flex h-screen w-screen'>
      {/* className='w-full xl:ml-80' */}
      <div className='w-full'>
        <Router>
        {/* <Header /> */}
        <div className='bg-[#fafbfc] dark:bg-secondary'>
          <div>
          <Routes>
            {/* Páginas de Autenticación (sin header) */}
            <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
            <Route path="/register" element={<PublicRoute> <Register /> </PublicRoute>} />

            {/* Rutas Públicas (con PublicHeader) */}
            <Route path="/" element={<LayoutPublic><Home /></LayoutPublic>} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <LayoutPrivate>
                    <Dashboard />
                    
                  </LayoutPrivate>
                  
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <LayoutPrivate>
                    <Services />
                    
                  </LayoutPrivate>
                  
                </ProtectedRoute>
              }
            />

            <Route path="/*" element={<LayoutPublic><Home /></LayoutPublic>} />
          </Routes>
          </div>
        </div>
        
      </Router>
      </div>
    
    

    </div>
  );
};

export default AppRouter;