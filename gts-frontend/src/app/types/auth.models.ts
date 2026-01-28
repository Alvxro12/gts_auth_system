export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
};

export type MeResponse = {
    id: number;
    email: string;
    roles: string[];
};

