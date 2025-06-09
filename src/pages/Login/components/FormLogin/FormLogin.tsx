import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchemaLogin } from "./FormLogin.form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoaderCircle } from "lucide-react"
import { useDispatch } from "react-redux"
import { loginUser } from "@/services"
import { useEffect, useState} from "react"
import { clearLocalStorage } from "@/utilities"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AppRoutes } from "@/models"
import { Link } from "react-router-dom"
import { toast } from "@/hooks/use-toast"
import { createToken, resetToken, TokenKey } from "@/redux/states/token"
import { createInfo, InfoKey, resetInfo } from "@/redux/states/info"

export function FormLogin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[isPending, setIsPending] = useState(false);

    const [params] = useSearchParams();
    const email=params.get("email");
    const password = params.get("password");
    useEffect(()=>{
      if(email && password){
          handleLogin(email as string, password as string);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[email, password])

    useEffect(() => {
      clearLocalStorage(TokenKey);
      clearLocalStorage(InfoKey);
      dispatch(resetToken());
      dispatch(resetInfo());
    }, []);

    const form = useForm<z.infer<typeof formSchemaLogin>>({
        resolver: zodResolver(formSchemaLogin),
        defaultValues: {
            email: "",
            password:""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
      handleLogin(values.email, values.password);
    }
    async function handleLogin(emailLogin: string, passwordLogin:string) {
      const id = setTimeout(() => {
        toast({
          variant: "destructive",
          description:
            "La inactividad de esta aplicación puede causar retrasos en la carga de datos. La reactivación puede demorar de 50 segundos o más. Espere por favor.",
        });
      }, 5000);

      try {
        setIsPending(true);
        const result = await loginUser(emailLogin, passwordLogin);

        if (result.code === "OK") {
          dispatch(createInfo(result.data?.info));
          dispatch(createToken(result.data?.token));
          navigate(AppRoutes.private.root, { replace: true });
        } else {
          toast({
            description: "❌ " + result.message,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsPending(false);
        clearTimeout(id);
      }
    }
    // async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    //   const id = setTimeout(() => {
    //     toast({
    //       variant: "destructive",
    //       description:
    //         "La inactividad de esta aplicación puede causar retrasos en la carga de datos. La reactivación puede demorar de 50 segundos o más. Espere por favor.",
    //     });
    //   }, 5000);

    //   try {
    //     setIsPending(true);
    //     const result = await loginUser(values.email, values.password);

    //     if (result.code === "OK") {
    //       dispatch(createInfo(result.data?.info));
    //       dispatch(createToken(result.data?.token));
    //       navigate(AppRoutes.private.root, { replace: true });
    //     } else {
    //       toast({
    //         description: "❌ " + result.message,
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsPending(false);
    //     clearTimeout(id);
    //   }
    // }

  return (

    <Card 
    className="w-[380px]"
    // className={cn("w-[380px]", className)} {...props}
    >
      <CardHeader className="text-center">
        <CardTitle>INICIAR SESIÓN</CardTitle>
        <CardDescription>Ingrese sus credenciales para continuar.</CardDescription>
      </CardHeader>


      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        
      <CardContent className="grid gap-4">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Ingrese su correo electrónico" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Ingrese su contraseña" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
          )}
          {isPending ? "Ingresando":"Ingresar"}
        </Button>

        <div className=" flex items-center space-x-4 rounded-md border p-4 w-full">
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground">
              Si no tiene una cuenta, <Link to={"/register"}><span className="text-sm text-secondary-foreground font-medium leading-none ">Registrese</span></Link>
            </p>
          </div>
        </div>
        
      </CardFooter>


      </form>
    </Form>

    </Card>



    
  )
}
