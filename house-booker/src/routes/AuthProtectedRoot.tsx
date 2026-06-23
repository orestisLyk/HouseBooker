import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth";

const AuthProtectedRoot = () => {
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
export default AuthProtectedRoot;