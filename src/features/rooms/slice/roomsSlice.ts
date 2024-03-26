import {
    EntityId,
    PayloadAction,
    createEntityAdapter,
    createSlice,
    current
} from "@reduxjs/toolkit";

import {
    messageAdded,
    messageRemoved
} from "features/chat/slice/messagesSlice";

export type RoomEntity = {
    id: EntityId;
    name: string;
    messageIds: EntityId[];
    imgSrc?: string;
};

export type RoomAddedAction = PayloadAction<Omit<RoomEntity, "messageIds">>;

export const roomsAdapter = createEntityAdapter<RoomEntity>();

//TODO: Add an extra reducer for message ids
export const roomsSlice = createSlice({
    name: "rooms",
    initialState: roomsAdapter.getInitialState(),
    reducers: {
        roomAdded: (state, { payload }: RoomAddedAction) => {
            roomsAdapter.addOne(state, {
                ...payload,
                messageIds: []
            });
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
        builder.addCase(
            messageRemoved,
            (state, { payload: { roomId, id } }) => {
                const room = current(state.ids).includes(roomId);

                const { messageIds } = current(state.entities[roomId]);

                if (room) {
                    roomsAdapter.updateOne(state, {
                        id: roomId,
                        changes: {
                            messageIds: messageIds.filter(
                                (messageId) => id !== messageId
                            )
                        }
                    });
                }
            }
        );
    }
});

export const { roomAdded, roomRemoved } = roomsSlice.actions;
