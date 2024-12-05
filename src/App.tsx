import { ReactNode } from "react";
import "./App.css";

interface Props {
  children: ReactNode
}
function App({children} : Props) {

  return (
    <>
    {/* <HeaderPrivate /> */}
    
    <div 
      className="flex-grow w-screen p-4 mt-12 items-center justify-center bg-primary-foreground"
    >
    {children}
    </div>
    </>
  );
}

export default App;
