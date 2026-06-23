import type { AuthUser, JwtPayload, LoginRequest } from "../shared/types/auth";
import { loginApi } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;    
        const password = formData.get("password") as string;

        const credentials : LoginRequest = {
            username,
            password
        };

        const token = await loginApi(credentials);

        login(token.token);

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