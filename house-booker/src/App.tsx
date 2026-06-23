import { Route, Routes } from "react-router"
import Layout from "./shared/layout/Layout"
import Homepage from "./pages/Homepage"
import HouseDetailsPage from "./pages/HouseDetailsPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"


function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Homepage />}/>
          <Route path="/houses/:id" element={<HouseDetailsPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
