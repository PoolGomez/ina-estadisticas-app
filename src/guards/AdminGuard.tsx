import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AdminGuard= () => {
    // const isAdmin = true;
    const userState = useSelector((store: AppStore) => store.user);

    return userState.rol === 'admin' ? <Outlet /> : <Navigate to="/" />
    // return userState.rol === 'admin' ? <Outlet /> : <Navigate to="/private/dashboard" replace />
}