import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth";

const OwnerProtectedRoute = () => {
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
export default OwnerProtectedRoute;