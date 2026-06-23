import type { AuthUser, JwtPayload, LoginRequest } from "../shared/types/auth";
import { login } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const LoginPage = () => {
    const navigate = useNavigate();

    

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;    
        const password = formData.get("password") as string;

        const credentials : LoginRequest = {
            username,
            password
        };

        const token = await login(credentials);

        const decoded = jwtDecode(token.token) as JwtPayload;
        
        const user: AuthUser = {
            id: parseInt(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]),
            username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            ownerId: decoded.OwnerId ? parseInt(decoded.OwnerId) : undefined,
            renterId: decoded.RenterId ? parseInt(decoded.RenterId) : undefined
        }

        console.log("Logged in user:", user);

        localStorage.setItem("token", token.token);

        navigate("/", { replace: true });
    }


    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                    <input type="text" id="username" name="username" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" name="password" className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">Login</button>
            </form>
        </>
    )
}
export default LoginPage;