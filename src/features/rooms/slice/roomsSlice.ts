import {
    EntityId,
    createEntityAdapter,
    createSlice,
    current,
    nanoid
} from "@reduxjs/toolkit";

import { RootState } from "app/store";
import { messageAdded } from "features";
import { useSelector } from "react-redux";

// import { roomsApi } from "../api";

export type RoomEntity = {
    id: EntityId;
    name: string;
    messageIds: EntityId[];
    imgSrc?: string;
};

const roomsAdapter = createEntityAdapter<RoomEntity>();

//TODO: Add an extra reducer for message ids
export const roomsSlice = createSlice({
    name: "rooms",
    initialState: roomsAdapter.getInitialState(),
    reducers: {
        roomAdded: {
            reducer: roomsAdapter.addOne,
            prepare: (name: string) => ({
                payload: {
                    id: nanoid(),
                    name,
                    messageIds: []
                }
            })
        },
        roomRemoved: roomsAdapter.removeOne
    },
    extraReducers: (builder) => {
        builder.addCase(messageAdded, (state, { payload: { roomId, id } }) => {
            const { messageIds } = current(state.entities[roomId]);

            roomsAdapter.updateOne(state, {
                id: roomId,
                changes: {
                    messageIds: [...messageIds, id]
                }
            });
        });
    }
});

export const { roomAdded, roomRemoved } = roomsSlice.actions;

export const roomsSelectors = roomsAdapter.getSelectors<RootState>(
    (state) => state.rooms
);

export const getMessageIdsByRoomId = (id: EntityId) =>
    useSelector((state: RootState) => roomsSelectors.selectById(state, id));

export const getAllRooms = () => useSelector(roomsSelectors.selectAll);
