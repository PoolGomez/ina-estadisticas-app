import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FormUpdateService } from "./FormUpdateService";

export function UpdateService({id}:{id:string}) {
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    
  return (
    <Dialog 
              open={openModalUpdate} onOpenChange={setOpenModalUpdate}
              >
                <DialogTrigger asChild>
                    <Button>
                    <Pencil className='h-4 w-4' /> 
                    Editar</Button>
                    {/* <div className="flex flex-grow items-center justify-between">
                      Editar <Pencil className="w-4 h-4"/>
                    </div>  */}
                </DialogTrigger>
                <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[625px] ">
                    <DialogHeader>
                        <DialogTitle>Actualizar Servicio</DialogTitle>
                        <DialogDescription>
                            Actualice los datos de su reunión de servicio.
                        </DialogDescription>
                    </DialogHeader>
                    {/* <FormCreateCategory companyId={companyId} setOpenModalCreate={setOpenModalCreate}/> */}
                    {/* <FormCreateService setOpen={setOpenModalCreate} /> */}
                    <FormUpdateService id={id} setOpen={setOpenModalUpdate} />
                </DialogContent>
            </Dialog>
  )
}
