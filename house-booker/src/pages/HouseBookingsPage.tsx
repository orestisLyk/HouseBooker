import { useEffect, useState } from "react";
import type { BookingReadOnly } from "../shared/types/booking";
import { getBookingsByHouseId } from "../api/bookingsApi";
import { useParams } from "react-router";
import { getHouseById } from "../api/housesApi";
import type { HouseReadOnly } from "../shared/types/house";
import BookingCard from "../shared/ui/BookingCard";

const HouseBookingsPage = () => {

    const [bookings, setBookings] = useState<BookingReadOnly[]>([]);
    const [house, setHouse] = useState<HouseReadOnly | null>(null);
    const houseId = useParams().houseId as unknown as number;

    useEffect(() => {
        const fetchBookings = async () => {
            const bookings = await getBookingsByHouseId(houseId);
            setBookings(bookings);
        }
        const fetchHouse = async () => {
            const house = await getHouseById(houseId.toString());
            setHouse(house);


        }
        fetchHouse();
        fetchBookings();
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Bookings for House {house?.name}</h1>
            <div className="grid grid-cols-1 gap-4 mx-4 text-center">
                {bookings.length > 0 && bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </div>
        </>
    )
}
export default HouseBookingsPage;