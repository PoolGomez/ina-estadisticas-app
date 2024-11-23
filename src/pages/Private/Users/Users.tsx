import { useUsers } from "@/hooks/useUsers"
import { HeaderUsers, ListUsers } from "./components";
import { useSelector } from "react-redux";
import { AppStore } from "@/redux/store";




export default function Users() {
  const { data: users, isLoading} = useUsers();
  const userState = useSelector((store: AppStore) => store.user);

  if(isLoading) return <p>Loading services...</p>

  return (
    <>
    <HeaderUsers />
    {users && (
      
        <>
        <div>
        <ListUsers id={userState.id} users={users}/>
        </div>
        </>
      )}
    </>
  )
}
