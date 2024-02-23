import { configureStore } from "@reduxjs/toolkit";

import { authReducer, authMiddleware } from "features";

import { api } from "./services/api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(authMiddleware.middleware)
            .concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
