import { deleteUser } from "../../api/usersApi";
import type { UserReadOnly } from "../types/user";
import Button from "./Button";

const UserCard = ({ user, onDelete }: { user: UserReadOnly, onDelete: () => void }) => {

    const handleDelete = async () => {
        try {
            await deleteUser(user.id);
            alert(`User ${user.username} deleted successfully.`);
            onDelete();
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again.");
        }
        
    }

    console.log("Rendering UserCard for user:", user);


    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2">{user.firstName} {user.lastName}</h2>
                <p className="mb-1">Username: {user.username}</p>
                <p className="text-gray-600 mb-1">Email: {user.email}</p>
                <p className="text-gray-600 mb-1">Role: {user.roleName}</p>
                <p className="text-gray-600 mb-1">User ID: {user.id}</p>
                <Button label="Delete" onClick={handleDelete} />
            </div>
        </>
    )
}
export default UserCard;