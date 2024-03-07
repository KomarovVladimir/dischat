import {
    EntityId,
    PayloadAction,
    createEntityAdapter,
    createSlice,
    nanoid
} from "@reduxjs/toolkit";

import { type RootState } from "app/store/store";

export type MessageEntity = {
    id: EntityId;
    roomId: EntityId;
    userName?: string;
    text: string;
    timestamp: string;
    isError?: boolean;
};

const messageAdapter = createEntityAdapter<MessageEntity>();

export const messagesSlice = createSlice({
    name: "messages",
    initialState: messageAdapter.getInitialState(),
    reducers: {
        messageAdded: {
            reducer: messageAdapter.addOne,
            prepare: (
                action: PayloadAction<{
                    userName: string;
                    roomId: string;
                    text: string;
                }>
            ) => ({
                payload: {
                    ...action.payload,
                    id: nanoid(),
                    timestamp: new Date().toISOString()
                }
            })
        },
        messageRemoved: messageAdapter.removeOne
    }
});

export const { messageAdded, messageRemoved } = messagesSlice.actions;

export const messagesSelectors = messageAdapter.getSelectors<RootState>(
    (state) => state.messages
);
