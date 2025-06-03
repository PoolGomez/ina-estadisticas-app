import { useUpdateRolUser, useUserById } from "@/hooks/useUsers";
import { Dispatch, SetStateAction, useEffect } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaUpdateRolUser } from "./FormUpdateUser.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertTriangle, LoaderCircle, PopcornIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roles } from "@/data";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertTitle } from "@/components/ui/alert";

type FormUpdateUserProps = {
    id: string,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function FormUpdateUser(props: FormUpdateUserProps) {
    const { id, setOpen} = props;
    // const {rolDetault , setRolDefault} = useState("");
    const {data: user, isPending: loadingUser, error: errorUser} = useUserById(id);
    const {mutate: updateRolUser, isPending: loadingUpdate, error: errorUpdate} = useUpdateRolUser();

    const form = useForm<z.infer<typeof formSchemaUpdateRolUser>>({
        resolver: zodResolver(formSchemaUpdateRolUser),
        defaultValues:{
            rol: ""
        }
    })

    useEffect(()=>{
        if(user){
            // setRolDefault(user.rol as string);
            form.reset({
                rol: user.rol,
            })
        }

    },[user, form])

    async function onSubmit(values: z.infer<typeof formSchemaUpdateRolUser>){
        try {
            updateRolUser({id: id, rol: values.rol},{
                onSuccess:(result)=>{
                    setOpen(false);
                    if(result.code === "success"){
                      toast({
                        description:"✅ Rol de usuario actualizado correctamente"
                      })
                    }else{
                      toast({
                        description:"❌ " + result.message
                      })
                    }
                    
                },
                onError:(error)=>{
                    console.log(error)
                    toast({
                        description:"❌ Ocurrio un error, intentelo de nuevo"
                      })
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    if(loadingUser) return <p>Loading user...</p>;
    if (errorUser) return <p>Error loading user.</p>;

  return (
    <Form {...form}>
    <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-2">
      <FormField
        // control={form.control}
        name="email"
        render={() => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="cargando..."
                value={user.email}
                readOnly
                disabled
                // {...field}
              />
            </FormControl>
            <FormMessage />
            <FormDescription>
            {errorUpdate && <label style={{ color: 'red' }}>{errorUpdate.message}</label>} {/* Muestra el mensaje de error aquí */}
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="rol"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rol</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={user?.rol}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione Rol" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {roles.map((rol) => (
                  <SelectItem
                    key={rol.key}
                    value={rol.key}
                  >
                    {rol.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid w-full max-w-xl items-start gap-4 justify-center">
      <Alert >
        <AlertTitle className="flex items-center justify-start">
        <AlertTriangle className="w-4 h-4 mr-2" />Usuario (Por Defecto): Solo puede ver el Dashboard.
        </AlertTitle>
      </Alert>
      <Alert >
        <AlertTitle className="flex items-center justify-start">
        <PopcornIcon className="w-4 h-4 mr-2" />Administrador: Puede ver todas la opciones.
        </AlertTitle>
      </Alert>
      </div>

      <Button type="submit" className="w-full" disabled={loadingUpdate || user.rol === form.getValues().rol}>
        {loadingUpdate && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
        Actualizar
      </Button>
    </form>
  </Form>
  )
}
