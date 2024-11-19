import { ReactNode } from "react";
import "./App.css";
// import { HeaderPrivate } from "./components/HeaderPrivate";

interface Props {
  children: ReactNode
}
function App({children} : Props) {

  return (
    <>
    {/* <HeaderPrivate /> */}
    <div 
      className="flex-grow w-screen p-4 mt-12 items-center justify-center"
    >
    {children}
    </div>
    
    <p>Footer</p>
    </>
  );
}

export default App;
