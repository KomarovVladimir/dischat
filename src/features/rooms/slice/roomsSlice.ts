import {
    EntityId,
    PayloadAction,
    createEntityAdapter,
    createSlice,
    current,
    nanoid
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
            reducer: (state, action: PayloadAction<RoomEntity>) => {
                roomsAdapter.addOne(state, {
                    ...action.payload,
                    messageIds: []
                });
            },
            prepare: (name: string) => ({
                payload: {
                    id: nanoid(),
                    messageIds: [],
                    name
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
