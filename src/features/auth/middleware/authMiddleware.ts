import { createListenerMiddleware } from "@reduxjs/toolkit";

import { logout, setUser } from "../slice";
import { USER_ITEM } from "../constants";

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
    actionCreator: logout,
    effect: async () => {
        localStorage.removeItem(USER_ITEM);
    }
});

authMiddleware.startListening({
    actionCreator: setUser,
    effect: async (action) => {
        localStorage.setItem(USER_ITEM, JSON.stringify(action.payload));
    }
});
