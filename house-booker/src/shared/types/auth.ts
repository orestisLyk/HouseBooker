export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
}

export type RegisterRequest = {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
}

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    role: string;
    ownerId?: number;
    renterId?: number;
}

export interface JwtPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;

    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;

    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;

    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;

    OwnerId?: string;
    RenterId?: string;

    exp: number;
    iss: string;
    aud: string;
}

export interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

