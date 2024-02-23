import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import { roomsSlice } from "features";

import { api } from "./services/api";

export const store = configureStore({
    reducer: {
        rooms: roomsSlice.reducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const roomsSelector: TypedUseSelectorHook<RootState> = useSelector;
