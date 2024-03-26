import { createSlice } from "@reduxjs/toolkit";

export type User = {
    userName: string | null;
};

const initialState = {
    userName: null
};

//TODO: Add an extra reducer for message ids
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
});

// export const {} = userSlice.actions;
