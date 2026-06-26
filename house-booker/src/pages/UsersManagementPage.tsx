import { useEffect, useState } from "react";
import type { UserReadOnly } from "../shared/types/user";
import { getUsers } from "../api/usersApi";
import UserCard from "../shared/ui/UserCard";
import Pagination from "../shared/ui/Pagination";

const UsersManagementPage = () => {
    const [users, setUsers] = useState<UserReadOnly[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers(currentPage, 10);
            setUsers(response.data);
            setTotalPages(response.totalPages);
        }
        fetchUsers();
    }, []);

    const onPageChange = (page: number) => {

        const fetchUsers = async () => {
            const response = await getUsers(page, 10);
            setUsers(response.data);
            setTotalPages(response.totalPages);
            
        }
        fetchUsers();
        setCurrentPage(page);
    }

    const handleDelete = (userId: number) => {
        setUsers(users.filter(user => user.id !== userId));
    }


    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Users Management</h1>
            <div className="grid grid-cols-1 gap-4 mx-4 text-center">
                {users.length > 0 && users.map((user) => (
                    <UserCard key={user.id} user={user} onDelete={() => handleDelete(user.id)} />
                ))}
            </div>
            
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />

        </>
    )
}
export default UsersManagementPage;