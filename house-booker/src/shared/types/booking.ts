
import z from "zod";

export const BookingCreateSchema = z.object({
    dateRange: z.object({
        startDate: z.date().min(new Date(), "Start date must be in the future"),
        endDate: z.date().min(new Date(), "End date must be in the future")
    }).refine((data) => {
        return data.endDate > data.startDate;
    }, {
        message: "End date must be after start date",
        path: ["endDate"]
    }).refine((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return data.startDate > today && data.endDate > today;
    }, {
        message: "Dates must be in the future",
        path: ["startDate", "endDate"]
    })
});

export type BookingCreate = {
    houseId: string;
    renterId: number;
    startDate: string;
    endDate: string;
}

export type BookingFormInput = {
    dateRange: {
        startDate: Date;
        endDate: Date;
    }
}

export type BookingReadOnly = {
    id: string;
    houseId: string;
    renterId: number;
    startDate: string;
    endDate: string;
}