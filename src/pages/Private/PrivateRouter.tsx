import { Navigate, Route } from "react-router-dom"
import { RoutesWithNotFound } from "@/utilities"
import { AppRoutes } from "@/models"
import { AdminGuard } from "@/guards/AdminGuard"
import { lazy } from "react"

const Dashboard = lazy(() => import("@/pages/Private/Dashboard/Dashboard"));
const Services = lazy(()=>import("@/pages/Private/Services/Services"))

export const PrivateRouter = () =>{
    
    return(
        <RoutesWithNotFound>
            {/* "/private/" */}
            <Route path="/" element={<Navigate to={AppRoutes.private.root + AppRoutes.private.dashboard} />} />
            <Route path={AppRoutes.private.dashboard} element={<Dashboard />} />
            {/* <Route path={AppRoutes.private.categories} element={<Categories />} /> */}


            <Route element={<AdminGuard />}>
                <Route path={AppRoutes.private.services} element={<Services />} />
            </Route>
        </RoutesWithNotFound>
    )
}