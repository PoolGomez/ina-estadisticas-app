import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useServiceById, useUpdateService } from "@/hooks/useServices";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { formSchemaUpdateService } from "./FormUpdateService.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { congregaciones, oficiantes } from "@/data";
import { toast } from "@/hooks/use-toast";

type FormUpdateServiceProps = {
    id: string,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function FormUpdateService(props: FormUpdateServiceProps) {
    const {id, setOpen} = props;
    const {data: service, isPending: loadingService, error: errorService} = useServiceById(id);

    const {mutate: updateService, isPending: loadingUpdate, error: errorUpdate} = useUpdateService();

    const form = useForm<z.infer<typeof formSchemaUpdateService>>({
        resolver: zodResolver(formSchemaUpdateService),
        defaultValues: {
          boleta: "",
          congregacion: "",
          fecha: new Date(),
          mes: "",
          escuelaDominical: 0,
          invitados: 0,
          miembros: 0,
          asistencia: 0,
          oficiante: "",
          ofrenda: 0,
          observacion: "",
        },
    });
    useEffect(()=>{
        if(service){
            form.reset({
                boleta: service.boleta,
                congregacion: service.congregacion,
                // fecha:  parse(service.fecha, 'dd-MM-yyyy', new Date()),
                fecha:  parse(service.fecha, 'dd-MM-yyyy', new Date()),
                mes: service.mes,
                escuelaDominical: service.escuelaDominical,
                invitados: service.invitados,
                miembros: service.miembros,
                asistencia: service.asistencia,
                oficiante: service.oficiante,
                ofrenda: service.ofrenda,
                observacion: service.observacion,
            });
        }
    },[service,form])

    async function onSubmit(values: z.infer<typeof formSchemaUpdateService>) {

        console.log(values)

        try {
          const newService = {
            // id: "",
            boleta: values.boleta,
            congregacion: values.congregacion,
            fecha: format(values.fecha, 'dd-MM-yyyy'),
            mes: new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
              values.fecha
            ),
            escuelaDominical: values.escuelaDominical,
            invitados: values.invitados,
            miembros: values.miembros,
            asistencia: values.asistencia,
            oficiante: values.oficiante,
            ofrenda: values.ofrenda,
            observacion: values.observacion,
          };
          // const result = await addService(newService);
          updateService({id: id, service: newService},{
            onSuccess: ()=>{
              setOpen(false);
              toast({
                description:"✅ Servicio actualizado correctamente"
              })
            },
            onError:(error)=>{
                console.log(error)
                toast({
                  description:"❌ Ocurrio un error, intentelo de nuevo"
                })
              },
          })
          
          
        } catch (error) {
          console.log(error);
        } 
    }

    // const asignarValores = () =>{
    //     if(service){
    //         form.reset({
    //             boleta: service.boleta,
    //             congregacion: service.congregacion,
    //             fecha: new Date(service.fecha),
    //             mes: service.mes,
    //             escuelaDominical: service.escuelaDominical,
    //             invitados: service.invitados,
    //             miembros: service.miembros,
    //             asistencia: service.asistencia,
    //             oficiante: service.oficiante,
    //             ofrenda: service.ofrenda,
    //             observacion: service.observacion,
    //         })
    //     }
        
    // }

    // if(isSuccess) {
    //     asignarValores();
    // }
    if (loadingService) return <p>Loading product...</p>;
    if (errorService) return <p>Error loading product.</p>;

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <FormField
        control={form.control}
        name="boleta"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Boleta</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Ingrese Nro de boleta"
                {...field}
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
        name="congregacion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Congregación</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={service?.congregacion}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione Congregación" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {congregaciones.map((congregacion) => (
                  <SelectItem
                    key={congregacion.codigo}
                    value={congregacion.nombre}
                  >
                    {congregacion.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fecha"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Fecha</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "dd-MM-yyyy")
                    ) : (
                      <span>dd-mm-aaaa</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  // selected={ field.value ? new Date(field.value) : parse(field.value, 'dd-MM-yyyy', new Date())}
                  selected={ field.value
                    // : parse(field.value, 'dd-MM-yyyy', new Date())
                  }
                  onSelect={
                    field.onChange
                    // (date) => {
                    //   if (date) {
                    //     field.onChange(format(date, "yyyy-MM-dd")); // Cambia el formato al que necesites
                    //   }
                    // }

                  }
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="escuelaDominical"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Escuela Dominical</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Asistencia escuela dominical"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="invitados"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Invitados</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Asistencia invitados"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="miembros"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Miembros</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Asistencia miembros"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="asistencia"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Asistencia</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Asitencia total" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="oficiante"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Oficiante</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={service?.oficiante}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione Oficiante" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {oficiantes.map((oficiante) => (
                  <SelectItem
                    key={oficiante.codigo}
                    value={oficiante.cargo + " " + oficiante.nombre}
                  >
                    {oficiante.cargo + " " + oficiante.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ofrenda"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ofrenda</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ingrese Ofrenda" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="observacion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observación</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ingrese una observación"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full" disabled={loadingUpdate}>
        {loadingUpdate && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
        Actualizar
      </Button>
    </form>
  </Form>
  )
}
