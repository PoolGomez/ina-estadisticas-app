import { z } from "zod";

export const formSchemaService = z.object({
    boleta: z.string({required_error: "Porfavor ingrese un número de boleta"}).min(1).max(15),
    congregacion: z.string().min(1,{
        message:"El campo congregación es obligatorio"
    }).max(75),
    // fecha: z.string().min(1).max(75),
    fecha: z.date({required_error: "Porfavor seleccione una fecha"}),
    mes:z.string(),
    escuelaDominical: z.coerce.number().gt(-1,{message:"Valor minimo 0"}),
    invitados: z.coerce.number().gt(-1,{message:"Valor minimo 0"}),
    miembros: z.coerce.number().gt(-1,{message:"Valor minimo 0"}),
    asistencia: z.coerce.number().gt(-1,{message:"Valor minimo 0"}),
    oficiante: z.string().min(1,{
        message:"El campo oficiante es obligatorio"
    }).max(75),
    ofrenda: z.coerce.number().gt(-1,{message:"Valor minimo 0"}),
    observacion: z.string(),
    // fecha2: z.date(),


})