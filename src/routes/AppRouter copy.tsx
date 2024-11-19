import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { ProtectedRoute } from './ProtectedRoute';

// import { Login } from '@/pages/Login';
// import { Register } from '@/pages/Register';
// import { LayoutPublic } from '@/layouts/LayoutPublic';
// import { LayoutPrivate } from '@/layouts/LayoutPrivate';
// import { Dashboard } from '@/pages/Dashboard';
// import { Services } from '@/pages/Services';
// import { Home } from '@/pages/Home';
// import { PublicRoute } from './PublicRoute';
// import { Products } from '@/pages/Products';
import { lazy, Suspense } from "react";

// Routes
const ProtectedRoute = lazy(() => import("@/routes/ProtectedRoute"));
const PublicRoute = lazy(() => import("@/routes/PublicRoute"));

// Layout
const LayoutPublic = lazy(() => import("@/layouts/LayoutPublic/LayoutPublic"));
const LayoutPrivate = lazy(() => import("@/layouts/LayoutPrivate/LayoutPrivate"));

// Pages
const Services = lazy(() => import("@/pages/Private/Services/Services"));
const Dashboard = lazy(() => import("@/pages/Private/Dashboard/Dashboard"));
const Home = lazy(() => import("@/pages/Home/Home"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Register = lazy(() => import("@/pages/Register/Register"));
const Products = lazy(() => import("@/pages/Private/Products/Products"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex w-screen h-full items-center justify-center"><p>Loading P...</p></div>}>
        <Routes>
          {/* Páginas de Autenticación (sin header) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Rutas Públicas (con PublicHeader) */}
          <Route
            path="/"
            element={
              <LayoutPublic>
                <Home />
              </LayoutPublic>
            }
          />

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
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <LayoutPrivate>
                  <Products />
                </LayoutPrivate>
              </ProtectedRoute>
            }
          />

          <Route
            path="/*"
            element={
              <LayoutPublic>
                <Home />
              </LayoutPublic>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
