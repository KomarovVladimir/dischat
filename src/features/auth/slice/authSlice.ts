import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthUser } from "../types";

interface AuthState {
    user?: AuthUser;
}

const initialState = {} as AuthState;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, { payload: user }: PayloadAction<AuthUser>) {
            state.user = { ...user };
        },
        logout(state) {
            state.user = undefined;
        }
    }
});

export const authReducer = authSlice.reducer;

export const { setUser, logout } = authSlice.actions;
