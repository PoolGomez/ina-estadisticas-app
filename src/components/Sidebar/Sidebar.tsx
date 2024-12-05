import { ChartBar, MapPin, Menu, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "@/models";
import { LogoName } from "../LogoName";

export default function Sidebar({ rol }: { rol: string }) {
    const location = useLocation();
    const isActive = (path:string) => location.pathname === path;


  return (
    <Sheet>
      <SheetTrigger className="bg-primary-foreground">
        <Menu className="ml-0"/>
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary-foreground" >
        <SheetHeader className="bg-primary-foreground">
          <SheetTitle><LogoName /></SheetTitle>
          <SheetDescription>
            {/* This action cannot be undone. This will permanently delete your account
        and remove your data from our servers. */}
        {(rol === "user" || rol === "admin") && (
            <Link
              to={AppRoutes.private.root + AppRoutes.private.dashboard}
              className={
                `flex items-center p-3 transition-all font-semibold rounded-md  
                ${isActive(AppRoutes.private.root + AppRoutes.private.dashboard) ? "text-blue-400" :"text-secondary-foreground"} `
              }
            >
              <ChartBar className="h-5 w-5 mr-4 shrink-0" />
              <span className="pl-2">Dashboard</span>
            </Link>
        )}

        {rol === "admin" && (
            <Link
              to={AppRoutes.private.root + AppRoutes.private.services}
              className={
                `flex items-center p-3 transition-all font-semibold rounded-md 
                ${isActive(AppRoutes.private.root + AppRoutes.private.services) ? "text-blue-400" :"text-secondary-foreground"} `}
            >
              <MapPin className="h-5 w-5 mr-4 shrink-0" />
              <span className="pl-2">Servicios</span>
            </Link>
        )}
        
        {rol === "admin" && (
            <Link
              to={AppRoutes.private.root + AppRoutes.private.users}
              className={
                `flex items-center p-3 transition-all font-semibold rounded-md 
                ${isActive(AppRoutes.private.root + AppRoutes.private.users) ? "text-blue-400" :"text-secondary-foreground"} `}
            >
              <User className="h-5 w-5 mr-4 shrink-0" />
              <span className="pl-2">Usuarios</span>
            </Link>
        )}
            
            
          </SheetDescription>
        </SheetHeader>
        
      </SheetContent>
    </Sheet>
  );
}
