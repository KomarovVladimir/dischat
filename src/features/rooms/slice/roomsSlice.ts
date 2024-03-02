import {
    EntityId,
    createEntityAdapter,
    createSlice,
    current,
    nanoid
    // current
} from "@reduxjs/toolkit";

import { messageAdded } from "features/chat/slice/messagesSlice";

export type RoomEntity = {
    id: EntityId;
    name: string;
    messageIds: EntityId[];
    imgSrc?: string;
};

export const roomsAdapter = createEntityAdapter<RoomEntity>();

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
