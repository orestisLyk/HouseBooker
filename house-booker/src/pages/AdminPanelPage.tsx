import { Link } from "react-router";

const AdminPanelPage = () => {

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
            <div className="grid grid-cols-1 gap-4 mx-4 text-center">
                <Link to="/admin/users" className="text-blue-500 hover:underline">Manage Users</Link>
            </div>
        </>
    )
}
export default AdminPanelPage;