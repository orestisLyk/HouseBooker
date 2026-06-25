import { useEffect, useState } from "react";
import type { BookingReadOnly } from "../types/booking";
import { getHouseById } from "../../api/housesApi";
import { Link } from "react-router";

const BookingCard = ({ booking }: { booking: BookingReadOnly }) => {
    const [housename, setHouseName] = useState<string>("loading...");
    const [status, setStatus] = useState<string>("loading...");

    useEffect(() => {
        const fetchHouse = async () => {
            const house = await getHouseById(booking.houseId);
            setHouseName(house.name);
        };
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);
        if(startDate > new Date()) {
            setStatus("Upcoming");
        } else if(endDate < new Date()) {
            setStatus("Past");
        } else {
            setStatus("Ongoing");
        }

        fetchHouse();
    }, []);

    return (
        <>
            <Link to={"/bookings/" + booking.id} className="block w-full">
            <div className="border rounded p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">{housename}</h2>
                <p className="text-gray-600 mb-2">Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">Status: {status}</p>
            </div>
            </Link>
            
        </>
    )
}
export default BookingCard;