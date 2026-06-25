import type { BookingCreate } from "../shared/types/booking";
import api from "./axios";

export const createBooking = async (booking: BookingCreate) => {
    await api.post("/bookings", booking);
}

export const getBookingById = async (bookingId: string) => {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
}

export const getBookingsByRenterId = async (renterId: number) => {
    const response = await api.get(`/bookings/by-renter/${renterId}`);
    return response.data;
}

export const getBookingsByHouseId = async (houseId: number) => {
    const response = await api.get(`/bookings/by-house/${houseId}`);
    return response.data;
}