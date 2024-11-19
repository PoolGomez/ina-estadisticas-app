import { useServices } from "@/hooks/useServices";
import { HeaderServices, ListServices } from "./components";

export default function Services() {
  const { data: services } = useServices();
  return (
    <div className="bg-secondary h-full p-4">
      <HeaderServices />
      {services && (
        <>
        <div 
        // className="hidden lg:block"
        >
        <ListServices services={services}/>
        </div>
        {/* <div className="lg:hidden">
          {services.map(()=>(
            <div>
            </div>
          ))}
        </div> */}
        </>
      )}
      
    </div>
  )
}
