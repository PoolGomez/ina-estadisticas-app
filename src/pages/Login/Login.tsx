
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearLocalStorage } from "@/utilities";
import { createUser, resetUser, UserKey } from "@/redux/states/user";
import { AppRoutes } from "@/models";
import { loginUser } from "@/services";






const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(AppRoutes.login, { replace: true });
  }, []);

  const login = async () => {
    try {
      const result = await loginUser( "pgomez4790@gmail.com", "Villapaul123#" );
      if(result.code === "OK"){
        dispatch(createUser(result.user));
        // navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
        navigate(AppRoutes.private.root, { replace: true });
      }else{
        alert(result.message)
      }
      // dispatch(createUser({ ...result, rol: Roles.USER }));
      // navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    } catch (error) { console.log(error)}
  };

    

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <h2>HOLA ESTE ES EL LOGIN</h2>
      <button onClick={login}>LOGIN</button>
    {/* <FormLogin /> */}

      
    

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

export default Login
