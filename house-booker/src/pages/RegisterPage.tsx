import { useNavigate } from "react-router";
import { registerApi } from "../api/auth";
import { RegisterSchema, type RegisterRequest } from "../shared/types/auth";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

type RegisterFormInput = z.input<typeof RegisterSchema>;

const RegisterPage = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInput, unknown, RegisterRequest>({
        resolver: zodResolver(RegisterSchema)
    });
    

    const onSubmit = async (data: RegisterRequest) => {
        try {
            await registerApi(data);
            navigate("/login", { replace: true });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                if (status === 400) {
                    alert("Invalid registration data. Please check your input.");
                } else if (status === 409) {
                    alert("Username or email already exists. Please choose another.");
                } else {
                    alert("An error occurred during registration. Please try again later.");
                }
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <form className="max-w-md mx-auto bg-white p-8 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                    <input type="text" id="username" {...register("username")} className="w-full p-2 border rounded" />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" {...register("email")} className="w-full p-2 border rounded" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-gray-700 font-bold mb-2">First Name</label>
                    <input type="text" id="firstname" {...register("firstName")} className="w-full p-2 border rounded" />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-gray-700 font-bold mb-2">Last Name</label>
                    <input type="text" id="lastname" {...register("lastName")} className="w-full p-2 border rounded" />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="roleId" className="block text-gray-700 font-bold mb-2">Role</label>
                    <select id="roleId" {...register("roleId")} className="w-full p-2 border rounded">
                        <option value={2}>Owner</option>
                        <option value={3}>Renter</option>
                    </select>
                    {errors.roleId && <p className="text-red-500 text-sm mt-1">{errors.roleId.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" {...register("password")} className="w-full p-2 border rounded" />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <button disabled={isSubmitting} type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">Register</button>
            </form>
        </>
    )
}
export default RegisterPage;