import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth";

const AuthProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Outlet/>
        </>
    )
}
export default AuthProtectedRoute;