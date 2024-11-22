import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaService } from "./FormCreateService.form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
// import { addService } from "@/services";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { congregaciones, oficiantes } from "@/data";
import { useCreateService } from "@/hooks/useServices";

type FormCreateServiceProps ={
    // open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function FormCreateService(props: FormCreateServiceProps) {
    const { setOpen } = props;

    const {mutate: createService, isPending, error} = useCreateService();

  const form = useForm<z.infer<typeof formSchemaService>>({
    resolver: zodResolver(formSchemaService),
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

  async function onSubmit(values: z.infer<typeof formSchemaService>) {

    try {
      const newService = {
        // id: "",
        boleta: values.boleta,
        congregacion: values.congregacion,
        fecha: format(values.fecha, "dd-MM-yyyy"),
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
      createService(newService,{
        onSuccess: ()=>{
          setOpen(false);
        }
      })
      
      
    } catch (error) {
      console.log(error);
    } 
  }
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
              {error && <label style={{ color: 'red' }}>{error.message}</label>} {/* Muestra el mensaje de error aquí */}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        // format(field.value, "PPP")
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
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Crear
        </Button>
      </form>
    </Form>
  );
}
