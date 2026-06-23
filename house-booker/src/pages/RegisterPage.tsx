import { useNavigate } from "react-router";
import { register } from "../api/auth";
import type { RegisterRequest } from "../shared/types/auth";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const firstName = formData.get("firstname") as string;
        const lastName = formData.get("lastname") as string;
        const password = formData.get("password") as string;
        const roleId = parseInt(formData.get("roleId") as string);

        const registerRequest: RegisterRequest = {
            username,
            email,
            firstName,
            lastName,
            password,
            roleId
        };

        register(registerRequest);

        navigate("/login", { replace: true });
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <form className="max-w-md mx-auto bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                    <input type="text" id="username" name="username" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full p-2 border rounded" />
                </div>

                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-gray-700 font-bold mb-2">First Name</label>
                    <input type="text" id="firstname" name="firstname" className="w-full p-2 border rounded" />
                </div>

                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-gray-700 font-bold mb-2">Last Name</label>
                    <input type="text" id="lastname" name="lastname" className="w-full p-2 border rounded" />
                </div>

                <div className="mb-4">
                    <label htmlFor="roleId" className="block text-gray-700 font-bold mb-2">Role</label>
                    <select id="roleId" name="roleId" className="w-full p-2 border rounded">
                        <option value="2">Owner</option>
                        <option value="3">Renter</option>
                    </select>
                                    </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" name="password" className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">Register</button>
            </form>
        </>
    )
}
export default RegisterPage;