import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchemaLogin } from "./FormLogin.form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoaderCircle } from "lucide-react"
// import { useLogin } from "@/hooks/useAuth"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "@/services"
// import { createUser, resetUser, UserKey } from "@/redux/states/user"
import { useEffect, useState, 
  // useTransition 
} from "react"
import { clearLocalStorage } from "@/utilities"
import { useNavigate } from "react-router-dom"
import { AppRoutes } from "@/models"
import { Link } from "react-router-dom"
import { toast } from "@/hooks/use-toast"
import { createToken, resetToken, TokenKey } from "@/redux/states/token"
import { createInfo, InfoKey, resetInfo } from "@/redux/states/info"

export function FormLogin() {

    
    // const navigate = useNavigate();
    // const { mutate: login, isPending } = useLogin();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const[isPending, startTransition] = useTransition();
    const[isPending, setIsPending] = useState(false);

    useEffect(() => {
      // clearLocalStorage(UserKey);
      // dispatch(resetUser());
      clearLocalStorage(TokenKey);
      clearLocalStorage(InfoKey);
      dispatch(resetToken());
      dispatch(resetInfo());
      // navigate(`/${AppRoutes.login}`, { replace: true });
    }, []);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchemaLogin>>({
        resolver: zodResolver(formSchemaLogin),
        defaultValues: {
            email: "",
            password:""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // login({ email: values.email, password: values.password }, {
        //   onSuccess: () => navigate('/dashboard'),
        //   onError: (err) => console.error(err),
        // });
        // startTransition( async () => {
          try {
            setIsPending(true)
            const result = await loginUser( values.email, values.password )
            if(result.code === 'OK'){
              // dispatch(createUser(result.data));
              dispatch(createInfo(result.data?.info));
              dispatch(createToken(result.data?.token));
              navigate(AppRoutes.private.root, { replace: true });
            }else{
              toast({
                description: "❌ " + result.message
              })
              
            }
            
  
          } catch (error) {
            console.log(error)
          }finally{
            setIsPending(false);
          }
          
        // })
        



    }

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
          Entrar
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
