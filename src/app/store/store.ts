import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import { messagesSlice } from "features/chat/slice/messagesSlice";
import { roomsSlice } from "features/rooms/slice/roomsSlice";

import { api } from "../services/api";

const rootReducer = combineReducers({
    [messagesSlice.reducerPath]: messagesSlice.reducer,
    [roomsSlice.reducerPath]: roomsSlice.reducer,
    [api.reducerPath]: api.reducer
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware)
    });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
