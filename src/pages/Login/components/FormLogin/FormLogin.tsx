import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchemaLogin } from "./FormLogin.form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoaderCircle } from "lucide-react"
import { useLogin } from "@/hooks/useAuth"
// import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function FormLogin() {

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { mutate: login, isPending } = useLogin();

    



    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchemaLogin>>({
        resolver: zodResolver(formSchemaLogin),
        defaultValues: {
            email: "",
            password:""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchemaLogin>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        login({ email: values.email, password: values.password }, {
          onSuccess: () => navigate('/dashboard'),
          onError: (err) => console.error(err),
        });

        console.log(values)
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
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
          )}
          Entrar
        </Button>
      </CardFooter>


      </form>
    </Form>

    </Card>



    
  )
}
