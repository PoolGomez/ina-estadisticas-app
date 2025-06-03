import { useServices } from "@/hooks/useServices";
import { HeaderServices, ListServices } from "./components";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/services";

export default function Services() {
  // const tokenState = useSelector((store: AppStore) => store.token);
  const { data: response } = useServices();
  const navigate = useNavigate();

  if(response?.code === 'error'){
    try {
      signOut(auth)
    } catch (error) {
      console.log(error)
    }finally{
      navigate("/login");
    }
    
  }

  

  return (
    <>
    <div className="mt-12">
      <HeaderServices />
      {response && (
        <>
        <div 
        // className="hidden lg:block"
        >
        <ListServices services={response.data}/>
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
    </>
  )
}
