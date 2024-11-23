import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { FormUpdateUser } from "./FormUpdateUser"

export function UpdateUser({id}:{id:string}) {
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
  return (
    <Dialog 
              open={openModalUpdate} onOpenChange={setOpenModalUpdate}
              >
                <DialogTrigger asChild>
                    <Button>
                    <Pencil className='h-4 w-4' /> 
                    Editar</Button>
                </DialogTrigger>
                <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[625px] ">
                    <DialogHeader>
                        <DialogTitle>Actualizar usuario</DialogTitle>
                        <DialogDescription>
                            Actualice el rol del usuario seleccionado.
                        </DialogDescription>
                    </DialogHeader>
                    <FormUpdateUser id={id} setOpen={setOpenModalUpdate} />
                </DialogContent>
            </Dialog>
  )
}
