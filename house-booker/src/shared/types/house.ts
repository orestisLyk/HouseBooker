import z from "zod";

export type HouseReadOnly = {
    id: string;
    name: string;
    description: string;
    address: string;
    region: string;
    pricePerNight: number;
    imageUrls: string[];
    ownerId: number;
}

export const HouseCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    address: z.string().min(1, "Address is required"),
    region: z.string().min(1, "Region is required"),
    pricePerNight: z.number().min(0, "Price per night must be a positive number"),
});

export type HouseCreate = z.infer<typeof HouseCreateSchema>;