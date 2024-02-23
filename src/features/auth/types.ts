import { Dispatch, SetStateAction } from "react";
import { Id } from "types";

export type UserSignInData = {
    email: string;
    password: string;
};

export type UserSignUpData = {
    email: string;
    password: string;
    confirmation: string;
    firstName: string;
    lastName: string;
};

export type AuthUser = {
    id: Id;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
};

export type AuthState = {
    user: AuthUser | null;
    setUser: Dispatch<SetStateAction<AuthUser | null>>;
};
