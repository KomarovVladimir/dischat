import { configureStore } from "@reduxjs/toolkit";

import { roomsReducer } from "features";

import { api } from "./services/api";

export const store = configureStore({
    reducer: {
        rooms: roomsReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
