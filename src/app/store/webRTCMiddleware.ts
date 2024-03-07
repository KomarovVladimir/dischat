import { Middleware } from "@reduxjs/toolkit";
import { roomAdded } from "features/rooms/slice/roomsSlice";
import { AppState } from "./store";

// Middleware<ThunkDispatch<State, ExtraThunkArg, BasicAction>, State, ThunkDispatch<State, ExtraThunkArg, BasicAction>>;

export const webRTCMiddleware: Middleware<unknown, AppState> =
    () => (next) => (action) => {
        if (roomAdded.match(action)) {
            const roomId = action.payload.id;

            console.log(roomId);

            // const webRTC = webRTCContext.webRTC;

            // webRTC.createConnection(roomId);
        }

        return next(action);
    };
