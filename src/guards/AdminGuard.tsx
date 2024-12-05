import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AdminGuard= () => {
    // const isAdmin = true;
    const infoState = useSelector((store: AppStore) => store.info);

    return infoState.rol === 'admin' ? <Outlet /> : <Navigate to="/" />
    // return userState.rol === 'admin' ? <Outlet /> : <Navigate to="/private/dashboard" replace />
}