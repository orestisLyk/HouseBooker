import { Link } from "react-router";

const Header = () => {

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
                    <Link to="/login" className="text-white p-4">
                        Login
                    </Link>
                    <Link to="/register" className="text-white p-4">
                        Register
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Header;