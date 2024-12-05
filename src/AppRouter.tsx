import { BrowserRouter as Router, Navigate, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import { PrivateGuard } from "./guards/PrivateGuard"
import { PrivateRouter } from "./pages/Private/PrivateRouter"
import { RoutesWithNotFound } from "./utilities"
import { AppRoutes } from "./models"
import Register  from "./pages/Register/Register"
import { HeaderPrivate } from "./components/HeaderPrivate"
import { ThemeProvider } from "./components/theme-provider"


export const AppRouter = () =>{

    return(
        <Router>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <HeaderPrivate>
                <RoutesWithNotFound>
                    <Route path="/" element={ <Navigate to={AppRoutes.private.root} /> } />
                    <Route path={AppRoutes.login} element={ <Login /> } />
                    <Route path={AppRoutes.register} element={ <Register /> } />
                    <Route element={<PrivateGuard />}>

                        {/* <Route element={<AdminGuard />}>
                            <Route path="/private/products" element={<Products />} />
                        </Route> */}
                        <Route path={`${AppRoutes.private.root}/*`} element={ <PrivateRouter /> } />
                        
                    </Route>

                </RoutesWithNotFound>
                </HeaderPrivate>
            </ThemeProvider>
        </Router>
    )
}