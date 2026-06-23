import type { HouseCreate, HouseReadOnly } from "../shared/types/house";
import type { PaginatedObject } from "../shared/types/core";
import api from "./axios";


export const getHouses = async (page: number=1, size: number=10): Promise<PaginatedObject<HouseReadOnly>> => {
    const response = await api.get<PaginatedObject<HouseReadOnly>>("/houses", {
        params: {
            page,
            size
        }
    });
    return response.data;
}

export const getHouseById = async (id: string): Promise<HouseReadOnly> => {
    const response = await api.get<HouseReadOnly>(`/houses/${id}`);
    return response.data;
}

export const getHousesByOwnerId = async (ownerId: number) : Promise<HouseReadOnly[]> => {
    const response = await api.get<HouseReadOnly[]>(`/houses/by-owner/${ownerId}`);
    return response.data;
}

export const createHouse = async (house: HouseCreate) : Promise<HouseReadOnly> => {
    const response = await api.post<HouseReadOnly>("/houses", house);
    return response.data;
}