import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// import { Input } from "../ui/input";
// import { Search } from "lucide-react";
// import { useLogout } from "@/hooks/useAuth";
// import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { NavbarHeader } from "../NavbarHeader";
import { logoutUser } from "@/services";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { LogoName } from "../LogoName";
import ModeToggle from "../ModeToggle/ModeToggle";
import { Button } from "../ui/button";

interface Props {
  children: ReactNode;
}

export function HeaderPrivate({ children }: Props) {

  

  const infoState = useSelector((store: AppStore) => store.info);

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logoutUser();
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login");
    }
  };

  return (
    // bg-background
    <div className="flex flex-col h-full w-full">
      <header className="fixed flex flex-grow top-0 left-0 w-full z-50 items-center justify-between p-2 bg-primary-foreground border-b h-12">
        
        <div className="relative lg:w-[300px]">
          {/* <Input placeholder='Search...' className='rounded-lg' />
        <Search strokeWidth={1} className='absolute top-2 right-2'/> */}
      
            

        <div className="flex gap-2 items-center justify-start ml-0">
          <div className="sm:hidden">
            <Sidebar rol={infoState.rol}/>
          </div>
          <LogoName />
          {/* <div className="flex gap-2 items-center justify-start">
            <img alt="logo" src="/logo.ico" width={32} height={32} />
            <Label>INA Estadisticas</Label>
          </div> */}
          
        </div>
          
        </div>

        <div className="hidden sm:block">
          <NavbarHeader rol={infoState.rol} />
        </div>

        <div className="flex gap-x-2 items-center">

        <ModeToggle />


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>
                {/* My Account */}
                {infoState.email ? infoState.email : <Button type="button" onClick={()=>navigate("/login")}>Identificiarse</Button>}
              </DropdownMenuLabel>
              {infoState.email && (
                <>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem> */}
                  <DropdownMenuItem onClick={handleLogout}>
                    Cerrar sesión
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {children}
    </div>
  );
}
