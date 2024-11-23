import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

import { useDeleteService } from "@/hooks/useServices";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteService({id}:{id: string}) {
    const { mutate : deleteService, isPending} = useDeleteService();
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const onDeleteService = () => {
      deleteService(id,{
        onSuccess: ()=>{
          setOpenModalDelete(false);
          toast({
            description:"✅ Servicio borrado correctamente"
          })
        },
        onError:(error)=>{
          console.log("error component:", error)
          setOpenModalDelete(false)
          toast({
            description:"❌ Ocurrio un error, intentelo de nuevo"
          })
        },
        
      })
    }

  return (
    // <Button variant="destructive" onClick={()=>deleteService(id)}>
    //   Borrar <Trash2 className="h-4 w-4"/>
    // </Button>

<Dialog open={openModalDelete} onOpenChange={setOpenModalDelete}>
<DialogTrigger asChild>
    <Button variant="destructive">
       Borrar <Trash2 className="h-4 w-4"/>
     </Button>
  </DialogTrigger>
<DialogContent className="sm:max-w-[625px]">
  <DialogHeader>
    <DialogTitle>
      ¿Está seguro que desea eliminar este servicio?
    </DialogTitle>
    <DialogDescription>
      Esta acción no se puede deshacer.
    </DialogDescription>
  </DialogHeader>

  {/* <FormCreateCategory companyId={companyId} setOpenModalCreate={setOpenModalCreate}/> */}

  <DialogFooter className="sm:justify-center">
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={onDeleteService}
    >
      {isPending && (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      )}
      Si
    </Button>

    <DialogClose asChild>
      <Button type="button" variant="secondary">
        No
      </Button>
    </DialogClose>
  </DialogFooter>
</DialogContent>
</Dialog>
    
  )
}
