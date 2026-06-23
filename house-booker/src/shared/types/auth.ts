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

export type JwtPayload = {
    sub: string;
    username: string;
    role: string;
    email: string;
    renterId?: number;
    ownerId?: number;
}