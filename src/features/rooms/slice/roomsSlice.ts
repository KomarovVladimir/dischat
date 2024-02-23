import { EntityId, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export type RoomEntity = {
    id: EntityId;
    name: string;
    imgSrc?: string;
};

const roomsAdapter = createEntityAdapter<RoomEntity>();

export const roomsSlice = createSlice({
    name: "rooms",
    initialState: roomsAdapter.getInitialState(),
    reducers: {
        roomAdded: roomsAdapter.addOne,
        roomRemoved: roomsAdapter.removeOne
    }
});

export const { roomAdded, roomRemoved } = roomsSlice.actions;

export const roomsSelectors = roomsAdapter.getSelectors(({ rooms }) => rooms);
