import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { messagesSlice } from "features/chat/slice/messagesSlice";
import { roomsSlice } from "features/rooms/slice/roomsSlice";

import { api } from "../services/api";

const rootReducer = combineReducers({
    [messagesSlice.reducerPath]: messagesSlice.reducer,
    [roomsSlice.reducerPath]: roomsSlice.reducer,
    [api.reducerPath]: api.reducer
});

export const setupStore = (preloadedState?: Partial<AppState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware)
    });
};

export const store = setupStore();

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
