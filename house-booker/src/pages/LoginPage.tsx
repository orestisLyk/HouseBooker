import { LoginSchema, type LoginRequest, type LoginResponse } from "../shared/types/auth";
import { loginApi } from "../api/auth";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors , isSubmitting },
    } = useForm<LoginRequest>({
        resolver: zodResolver(LoginSchema)      
    });

    const onSubmit = async (data: LoginRequest) => {
        try {
            const response: LoginResponse = await loginApi(data);
            login(response.token);
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };


    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                    <input type="text" id="username" {...register("username")} className="w-full p-2 border rounded" />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" {...register("password")} className="w-full p-2 border rounded" />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>} 
                </div>
                <button disabled={isSubmitting} type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">Login</button>
            </form>
        </>
    )
}
export default LoginPage;