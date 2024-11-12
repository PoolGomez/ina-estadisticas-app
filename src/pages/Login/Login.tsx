
import { FormLogin } from "./components/FormLogin";
// import { cn } from "@/lib/utils";
// import { z } from "zod";
// import { useForm } from "react-hook-form";






export const Login = () => {

    

    

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

    <FormLogin />

      
    

    </div>

    
    // <div>
    //   <h1>Login</h1>
    //   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
    //   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    //   <Button onClick={handleLogin} disabled={isPending}>
    //     {isPending && (
    //       <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
    //     )}
    //     Login
    //   </Button>
    //   {error && <p>Error: {error.message}</p>}
    // </div>
  )
}
