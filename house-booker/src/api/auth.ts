import type { AuthUser, JwtPayload, LoginRequest, LoginResponse, RegisterRequest } from "../shared/types/auth";
import api from "./axios";

export const loginApi = async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", request);
    return response.data;
}

export const registerApi = async (request: RegisterRequest): Promise<boolean> => {
    const response = await api.post<boolean>("/auth/register", request);
    return response.data;
}

export const toAuthUser = (data: JwtPayload): AuthUser => {
    return {
        id: parseInt(data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]),
        username: data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        role: data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        ownerId: data.OwnerId ? parseInt(data.OwnerId) : undefined,
        renterId: data.RenterId ? parseInt(data.RenterId) : undefined
    }
}