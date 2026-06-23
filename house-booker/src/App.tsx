import { Route, Routes } from "react-router"
import Layout from "./shared/layout/Layout"
import Homepage from "./pages/homepage"
import HouseDetailsPage from "./pages/HouseDetailsPage"


function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Homepage />}/>
          <Route path="/houses/:id" element={<HouseDetailsPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
