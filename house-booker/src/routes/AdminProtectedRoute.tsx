import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const AdminProtectedRoot = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || user?.role !== "admin") {
        return <p>Access denied. Admins only.</p>;
    }

    return (
        <>
            <Outlet/>
        </>
    )
}
export default AdminProtectedRoot;