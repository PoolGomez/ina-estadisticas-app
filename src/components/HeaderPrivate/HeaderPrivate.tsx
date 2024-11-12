// import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import { Input } from "../ui/input";
// import { Search } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";
import { Label } from "../ui/label";

export function HeaderPrivate() {

    const navigate = useNavigate();
    const { mutate: logout} = useLogout();

    const location = useLocation();

    // Función para verificar si la ruta está activa
    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
      try {
        logout();
      } catch (error) {
        console.log(error);
      }finally{
        navigate('/login');
      }
      
      
      // logout({
      //   onSuccess: () => navigate('/login'),
      // });
    };

  return (
    <header className="flex items-center px-2 gap-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-14">
      {/* <div>
        <Link to="/" className="text-2xl font-bold">MyApp</Link>
      </div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          </li>
          <li>
            <button 
            // onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded">
              Logout
            </button>
          </li>
        </ul> */}
        <div className='relative w-[300px]'>
        {/* <Input placeholder='Search...' className='rounded-lg' />
        <Search strokeWidth={1} className='absolute top-2 right-2'/> */}
        <Label>INA Estadisticas</Label>
        </div>

        <div>
        <nav
          className={"flex items-center space-x-4 lg:space-x-6"}
        >
          <div
            // href="/examples/dashboard"
            onClick={()=>navigate("/dashboard")}
            className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${!isActive("/dashboard") && "text-muted-foreground"}`}
          >
            Dashboard
          </div>
          <div
            // href="/examples/dashboard"
            onClick={()=>navigate("/services")}
            className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${!isActive("/services") && "text-muted-foreground"}`}
          >
            Servicios
          </div>
          
        </nav>

        </div>

        <div className='flex gap-x-2 items-center'>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>

        
        
      {/* </nav> */}
    </header>




  )
}
