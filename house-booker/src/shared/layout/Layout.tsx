import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {

    return (
        <>
            <Header/>
            <main className="container mx-auto min-h-[95vh] pt-36">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}
export default Layout;