import { useUsers } from "@/hooks/useUsers"
import { HeaderUsers, ListUsers } from "./components";
import { useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { signOut } from "firebase/auth";
import { auth } from "@/services";
import { useNavigate } from "react-router-dom";





export default function Users() {
  const { data: response} = useUsers();
  const userState = useSelector((store: AppStore) => store.user);
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
    <HeaderUsers />
    {response && (
      
        <>
        <div>
        <ListUsers id={userState.id} users={response.data}/>
        </div>
        </>
      )}
    </>
  )
}
