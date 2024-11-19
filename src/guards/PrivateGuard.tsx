import { AppRoutes } from "@/models";
import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateGuard = () => {
    // const authenticated = false;
    const userState = useSelector((store: AppStore) => store.user);

    return userState.name ? <Outlet /> : <Navigate to={AppRoutes.login} replace/>
}