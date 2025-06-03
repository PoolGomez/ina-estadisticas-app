import { ReactNode } from "react";
import "./App.css";

interface Props {
  children: ReactNode
}
function App({children} : Props) {

  return (
    <>
    <div 
      className="flex-grow w-screen min-h-screen p-4 lg:mt-0 items-center justify-center bg-primary-foreground"
    >
      
    {children}
    </div>
    </>
  );
}

export default App;
