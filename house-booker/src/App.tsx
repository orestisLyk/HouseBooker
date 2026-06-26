import { Route, Routes } from "react-router"
import Layout from "./shared/layout/Layout"
import Homepage from "./pages/Homepage"
import HouseDetailsPage from "./pages/HouseDetailsPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AuthProtectedRoute from "./routes/AuthProtectedRoute"
import OwnerProtectedRoute from "./routes/OwnerProtectedRoute"
import OwnedHousesPage from "./pages/OwnedHousesPage"
import AddHousePage from "./pages/AddHousePage"
import AddImagePage from "./pages/AddImagePage"
import RenterProtectedRoute from "./routes/RenterProtectedRoute"
import AddBookingPage from "./pages/AddBookingPage"
import RenterBookingsPage from "./pages/RenterBookingsPage"
import HouseBookingsPage from "./pages/HouseBookingsPage"
import BookingDetailsPage from "./pages/BookingDetailsPage"
import AdminProtectedRoute from "./routes/AdminProtectedRoute"
import AdminPanelPage from "./pages/AdminPanelPage"
import UsersManagementPage from "./pages/UsersManagementPage"


function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Homepage />}/>
          <Route path="/houses/:id" element={<HouseDetailsPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>

          <Route element={<AuthProtectedRoute />}>
            <Route element={<OwnerProtectedRoute />}>
              <Route path="/houses/by-owner/:ownerId" element={<OwnedHousesPage />}/>
              <Route path="/houses/new" element={<AddHousePage />}/>
              <Route path= "/houses/:houseId/createImage" element={<AddImagePage />}/>
              <Route path="bookings/by-house/:houseId" element={<HouseBookingsPage />}/>
            </Route>
            <Route element={<RenterProtectedRoute />}>
              <Route path="/houses/:houseId/book" element={<AddBookingPage />}/>
              <Route path="/bookings/by-renter" element={<RenterBookingsPage />}/>
            </Route>
            <Route path="/bookings/:bookingId" element={<BookingDetailsPage />}/>
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminPanelPage />}/>
              <Route path="/admin/users" element={<UsersManagementPage />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )}

export default App
