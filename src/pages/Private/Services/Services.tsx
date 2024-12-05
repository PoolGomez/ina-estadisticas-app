import { useServices } from "@/hooks/useServices";
import { HeaderServices, ListServices } from "./components";

export default function Services() {
  // const tokenState = useSelector((store: AppStore) => store.token);
  const { data: services, isLoading } = useServices();
  

  if(isLoading) return <p>Loading services...</p>

  return (
    <>
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
      
    </>
  )
}
