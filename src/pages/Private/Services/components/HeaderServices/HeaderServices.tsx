import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export function HeaderServices() {

    const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex items-center justify-between">
        <h2 className="text-2xl">Servicios</h2>

        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            <DialogTrigger asChild>
                <Button>
                <Plus className='h-4 w-4' /> 
                Crear Servicio</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Crear Servicio</DialogTitle>
                    <DialogDescription>
                        Crea y configure su servicio
                    </DialogDescription>
                </DialogHeader>

                {/* <FormCreateCategory companyId={companyId} setOpenModalCreate={setOpenModalCreate}/> */}
            </DialogContent>
        </Dialog>
    </div>
  )
}
