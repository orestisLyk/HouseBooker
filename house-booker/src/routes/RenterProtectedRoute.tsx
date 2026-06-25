import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const RenterProtectedRoute = () => {
    const { user } = useAuth();

    if (!user?.role.includes("Renter")) {
        return <div>You do not have permission to access this page.</div>;
    }

    return (
        <>
            <Outlet />
        </>
    );

}
export default RenterProtectedRoute;
