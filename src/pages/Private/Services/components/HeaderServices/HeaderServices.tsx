import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormCreateService } from "./FormCreateService";

export function HeaderServices() {

    const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    // items-center justify-between 
    <div className="flex items-center justify-between gap-4 w-full">
        <h2 className="text-2xl">Servicios</h2>

        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            <DialogTrigger asChild>
                <Button>
                <Plus className='h-4 w-4' /> 
                Crear Servicio</Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[625px] ">
                <DialogHeader>
                    <DialogTitle>Crear Servicio</DialogTitle>
                    <DialogDescription>
                        Registre los datos de su reunión de servicio
                    </DialogDescription>
                </DialogHeader>

                {/* <FormCreateCategory companyId={companyId} setOpenModalCreate={setOpenModalCreate}/> */}
                <FormCreateService setOpen={setOpenModalCreate} />
            </DialogContent>
        </Dialog>
    </div>
  )
}
