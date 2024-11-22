import { useDeleteService } from "@/hooks/useServices";
import { Trash2 } from "lucide-react";

export function DeleteService({id}:{id: string}) {
    const { mutate : deleteService} = useDeleteService();

  return (
    <div className="flex flex-grow items-center justify-between" onClick={()=>deleteService(id)}>
        <span>Borrar</span> <Trash2 className="h-4 w-4"/> 
    </div>
    
  )
}
