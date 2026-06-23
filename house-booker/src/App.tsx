import { Route, Routes } from "react-router"
import Layout from "./shared/layout/Layout"
import Homepage from "./pages/Homepage"
import HouseDetailsPage from "./pages/HouseDetailsPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AuthProtectedRoot from "./routes/AuthProtectedRoot"
import OwnerProtectedRoot from "./routes/OwnerProtectedRoot"
import OwnedHousesPage from "./pages/OwnedHousesPage"
import AddHousePage from "./pages/AddHousePage"


function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Homepage />}/>
          <Route path="/houses/:id" element={<HouseDetailsPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>

          <Route element={<AuthProtectedRoot />}>
            <Route element={<OwnerProtectedRoot />}>
              <Route path="/houses/by-owner/:ownerId" element={<OwnedHousesPage />}/>
              <Route path="/houses/new" element={<AddHousePage />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
