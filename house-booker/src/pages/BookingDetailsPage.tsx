import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getBookingById } from "../api/bookingsApi";
import type { BookingReadOnly } from "../shared/types/booking";
import type { HouseReadOnly } from "../shared/types/house";
import { getHouseById } from "../api/housesApi";

const BookingDetailsPage = () => {
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

    return (
        <>
            {booking ? (
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">Booking Details</h1>
                    <Link to={"/houses/" + house?.id} className="block w-full">
                        <h2 className="text-xl font-semibold mb-2">House: {house?.name}</h2>
                    </Link>
                    <p className="text-gray-600 mb-2">Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
                    <p className="text-gray-600 mb-2">End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading booking details...</p>
            )}

        </>
    )
}
export default BookingDetailsPage;