import { z } from "zod";

export const formSchemaUpdateRolUser = z.object({
    rol: z.string({required_error: "Porfavor ingrese un número de boleta"}),
})