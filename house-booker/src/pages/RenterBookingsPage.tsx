import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getBookingsByRenterId } from "../api/bookingsApi";
import type { BookingReadOnly } from "../shared/types/booking";
import BookingCard from "../shared/ui/BookingCard";
import { useNavigate } from "react-router";

const RenterBookingsPage = () => {

    const [bookings, setBookings] = useState<BookingReadOnly[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBookings = async () => {
            const bookings = await getBookingsByRenterId(user?.renterId as number);
            setBookings(bookings);
        }
        if(user?.role !== "Renter") {
            navigate("/");
        }
        fetchBookings();
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
            <div className="grid grid-cols-1 gap-4 mx-4 text-center">
                {bookings.length > 0 && bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </div>

        </>
    )
}
export default RenterBookingsPage;