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

export const store = setupStore({
    rooms: {
        entities: {
            "123": { id: "123", name: "Test", messageIds: ["1", "2", "3", "4"] }
        },
        ids: ["123"]
    },
    messages: {
        entities: {
            "1": {
                id: "1",
                text: "Text Message",
                roomId: "123",
                timestamp: new Date().toISOString()
            },
            "2": {
                id: "2",
                text: "Text Message",
                roomId: "123",
                timestamp: new Date().toISOString()
            },
            "3": {
                id: "3",
                userName: "User Name",
                text: "Text Message",
                roomId: "123",
                timestamp: new Date().toISOString()
            },
            "4": {
                id: "4",
                text: "Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message Text Message ",
                roomId: "123",
                timestamp: new Date().toISOString()
            }
        },
        ids: ["1", "2", "3", "4"]
    }
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
