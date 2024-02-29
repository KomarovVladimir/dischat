import {
    EntityId,
    createEntityAdapter,
    createSlice,
    current,
    nanoid
    // current
} from "@reduxjs/toolkit";

import { RootState, useAppSelector } from "app/store";
import { messageAdded } from "features/chat/slice/messagesSlice";

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
            const room = current(state.ids).includes(roomId);

            if (room) {
                const { messageIds } = current(state.entities[roomId]);

                roomsAdapter.updateOne(state, {
                    id: roomId,
                    changes: {
                        messageIds: [...messageIds, id]
                    }
                });
            }
        });
    }
});

export const { roomAdded, roomRemoved } = roomsSlice.actions;

export const roomsSelectors = roomsAdapter.getSelectors<RootState>(
    (state) => state.rooms
);

export const getMessageIdsByRoomId = (id: EntityId) =>
    useAppSelector((state) => roomsSelectors.selectById(state, id)?.messageIds);

export const getAllRooms = () => useAppSelector(roomsSelectors.selectAll);

export const getRoomById = (id: EntityId) =>
    useAppSelector((state) => roomsSelectors.selectById(state, id));

export const roomExists = (id: EntityId) =>
    useAppSelector((state) => roomsSelectors.selectIds(state).includes(id));
