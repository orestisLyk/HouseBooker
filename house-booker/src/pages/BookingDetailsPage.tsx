import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteBooking, getBookingById } from "../api/bookingsApi";
import type { BookingReadOnly } from "../shared/types/booking";
import type { HouseReadOnly } from "../shared/types/house";
import { getHouseById } from "../api/housesApi";
import Button from "../shared/ui/Button";

const BookingDetailsPage = () => {
    const navigate = useNavigate();
    const bookingId = useParams().bookingId as string;
    const [booking, setBooking] = useState<BookingReadOnly | null>(null);
    const [house, setHouse] = useState<HouseReadOnly | null>(null);

    useEffect(() => {

        const fetchHouse = async () => {
                
            }

        const fetchBookingAndHouse = async () => {
            try {
                const response = await getBookingById(bookingId);
                setBooking(response);
                const houseResponse = await getHouseById(response.houseId.toString());
                setHouse(houseResponse);
            } catch (error) {
                console.error("Failed to fetch booking:", error);
                alert("Failed to fetch booking details. Please try again later.");
            }
               fetchHouse();
            
        }

        fetchBookingAndHouse();
    }, [bookingId]);


    const handleDelete = async () => {
        if (!booking) {
            alert("Booking details are not loaded yet.");
            return;
        }

        if(booking.startDate <= new Date().toISOString().split('T')[0]) {
            alert("You cannot cancel a booking that has already started or is in the past.");
            return;
        }

        if(!window.confirm("Are you sure you want to cancel this booking?")) {
            return;
        }

        try {
            await deleteBooking(booking.id.toString());
            alert("Booking cancelled successfully.");
            navigate("/bookings/by-renter");
        } catch (error) {
            console.error("Failed to cancel booking:", error);
            alert("Failed to cancel booking. Please try again later.");
        }
    }

    return (
        <>
            {booking ? (
                <>
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">Booking Details</h1>
                    <Link to={"/houses/" + house?.id} className="block w-full">
                        <h2 className="text-xl font-semibold mb-2">House: {house?.name}</h2>
                    </Link>
                    <p className="text-gray-600 mb-2">Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
                    <p className="text-gray-600 mb-2">End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
                </div>

                <Button label="Cancel Booking" onClick={handleDelete} />
                </>
            ) : (
                <p>Loading booking details...</p>
            )}

        </>
    )
}
export default BookingDetailsPage;