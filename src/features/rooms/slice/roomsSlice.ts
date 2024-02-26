import { EntityId, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

// import { roomsApi } from "../api";

export type RoomEntity = {
    id: EntityId;
    name: string;
    messageIds: EntityId[];
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
    // extraReducers: (builder) => {
    //     builder.addMatcher(
    //         roomsApi.endpoints.addRoom.matchFulfilled,
    //         (state, { payload }) => {
    //             roomsAdapter.addOne(state, payload);
    //         }
    //     );
    // }
});

export const { roomAdded, roomRemoved } = roomsSlice.actions;

export const roomsSelectors = roomsAdapter.getSelectors(({ rooms }) => rooms);
