import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth";

const OwnerProtectedRoot = () => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated || user?.role !== "Owner") {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Outlet/>
        </>
    )
}
export default OwnerProtectedRoot;