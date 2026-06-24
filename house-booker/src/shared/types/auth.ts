import z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export type LoginRequest = z.infer<typeof LoginSchema>;

export type LoginResponse = {
    token: string;
}

export const RegisterSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    roleId: z.coerce.number().int().min(1, "Role ID is required"),  
});

export type RegisterRequest = z.infer<typeof RegisterSchema>;


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

