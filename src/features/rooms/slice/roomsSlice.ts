import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RoomData } from "../types";

const roomsAdapter = createEntityAdapter<RoomData>();

const roomsSlice = createSlice({
    name: "rooms",
    initialState: roomsAdapter.getInitialState(),
    reducers: {
        roomAdded: roomsAdapter.addOne,
        roomRemoved: roomsAdapter.removeOne
    }
});

export const roomsReducer = roomsSlice.reducer;

export const { roomAdded, roomRemoved } = roomsSlice.actions;
