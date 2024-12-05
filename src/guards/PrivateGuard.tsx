import { AppRoutes } from "@/models";
import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateGuard = () => {
    // const authenticated = false;
    const infoState = useSelector((store: AppStore) => store.info);

    return infoState.rol ? <Outlet /> : <Navigate to={AppRoutes.login} replace/>
}