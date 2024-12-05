// import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "@/models";
import { useLocation, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export  function NavbarHeader({rol}:{rol:string}) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const redirect = (path: string) => {
        navigate(path);
    }
  return (
    <nav
          className={"flex items-center space-x-4 lg:space-x-6"}
        >

        {(rol === 'user' || rol === 'admin') && (
            <div
            // href="/examples/dashboard"
            // onClick={ ()=> <Navigate to="/dashboard" /> }
            onClick={()=>redirect(AppRoutes.private.root + AppRoutes.private.dashboard)}
            className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${isActive(AppRoutes.private.root + AppRoutes.private.dashboard) ? "text-blue-400" : "text-secondary-foreground"}`}
          >
            Dashboard
            
          </div>
        )}
          
          {rol==='admin' && (
            <div
                // href="/examples/dashboard"
                onClick={()=>redirect(AppRoutes.private.root + AppRoutes.private.services)}
                // onClick={ ()=> <Navigate to="/services" /> }
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${isActive(AppRoutes.private.root + AppRoutes.private.services) ? "text-blue-400" : "text-secondary-foreground"}`}
            >
                Servicios
                
            </div>
          )}

          {rol==='admin' && (
            <div
                // href="/examples/dashboard"
                onClick={()=>redirect(AppRoutes.private.root + AppRoutes.private.users)}
                // onClick={ ()=> <Navigate to="/services" /> }
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${isActive(AppRoutes.private.root + AppRoutes.private.users) ? "text-blue-400" : "text-secondary-foreground"}`}
            >
                Usuarios
                
            </div>
          )}
          

          {/* <div
            // href="/examples/dashboard"
            // onClick={()=>navigate("/products")}
            className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${!isActive("/products") && "text-muted-foreground"}`}
          >
            Productos
          </div> */}
          
        </nav>
  )
}
