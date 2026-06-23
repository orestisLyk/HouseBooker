import type { LoginRequest, LoginResponse, RegisterRequest } from "../shared/types/auth";
import api from "./axios";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", request);
    return response.data;
}

export const register = async (request: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/register", request);
    return response.data;
}