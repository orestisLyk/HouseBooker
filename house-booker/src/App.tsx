import { Route, Routes } from "react-router"
import Layout from "./shared/layout/Layout"


function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<div>Home</div>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
