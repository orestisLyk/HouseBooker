import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
    const  { isAuthenticated, user, logout } = useAuth();

    let isOwner = null;
    let isRenter = null;
    let isAdmin = null;
    if(isAuthenticated) {
        isOwner = user?.role.includes("Owner");
        isRenter = user?.role.includes("Renter");
        isAdmin = user?.role.includes("Admin");
    }

    return (
        <>
            <div className="bg-primary fixed flex justify-between w-full p-4">
                <div className="text-2xl text-white font-bold p-4">
                    House Booker
                </div>
                <div className="flex items-center">
                    <Link to="/" className="text-white p-4">
                        Home
                    </Link>
                    {isRenter && (
                        <>
                            <span className="text-white p-4">Welcome, {user?.username}</span>
                            <Link to="/bookings/by-renter" className="text-white p-4">
                                My Bookings
                            </Link>
                            <button onClick={logout} className="text-white p-4">Logout</button>
                        </>
                    )}
                    {isOwner && (
                        <>
                            <span className="text-white p-4">Welcome, {user?.username}</span>
                            <Link to={`/houses/by-owner/${user?.ownerId}`} className="text-white p-4">
                                My Houses
                            </Link>
                            <Link to="/houses/new" className="text-white p-4">
                                Add House
                            </Link>
                            <button onClick={logout} className="text-white p-4">Logout</button>
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <span className="text-white p-4">Welcome, {user?.username}</span>
                            <Link to="/admin" className="text-white p-4">
                                Admin Panel
                            </Link>
                            <button onClick={logout} className="text-white p-4">Logout</button>
                        </>
                    )}

                    {!isAuthenticated && (
                        <>
                            <Link to="/login" className="text-white p-4">
                                Login
                            </Link>
                            <Link to="/register" className="text-white p-4">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default Header;