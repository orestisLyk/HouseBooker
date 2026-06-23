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

export type HouseCreate = {
    name: string;
    description: string;
    address: string;
    region: string;
    pricePerNight: number;
}