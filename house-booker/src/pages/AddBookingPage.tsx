import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { createBooking } from "../api/bookingsApi";
import type { BookingCreate } from "../shared/types/booking";


const AddBookingPage = () => {
    const {user} = useAuth();
    const houseId = useParams().houseId as string;
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const navigate = useNavigate();

    const toDateOnlyString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const onSubmit = async () => {
        if (!dateRange?.from || !dateRange.to) {
            alert("Please select a start and end date.");
            return;
        }

        if (!user?.renterId) {
            alert("You must be logged in as a renter to make a booking.");
            return;
        }

        const bookingData: BookingCreate = {
            startDate: toDateOnlyString(dateRange.from),
            endDate: toDateOnlyString(dateRange.to),
            houseId,
            renterId: user.renterId
        };

        try {
            await createBooking(bookingData);
            navigate("/bookings/by-renter");
        } catch (error) {
            const status = (error as any)?.response?.status;
            if (status === 400) {
                alert("Invalid booking data. Please check the dates and try again.Dates must be in the future");
            } else {
                console.error("Error creating booking:", error);
                alert("Failed to create booking. Please try again.");
            }
        }

        
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-4 mx-4">Add Booking</h1>
            <form className="max-w-md mx-auto bg-white p-6 rounded shadow-md" onSubmit={(event) => { event.preventDefault(); void onSubmit(); }}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Select booking dates</label>
                    <DayPicker
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        disabled={{ before: new Date() }}
                    />
                </div>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">Add Booking</button>
            </form>

        </>
    )
}
export default AddBookingPage;