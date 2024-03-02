import {
    EntityId,
    createEntityAdapter,
    createSlice,
    nanoid
} from "@reduxjs/toolkit";

import { type RootState } from "app/store";

export type MessageEntity = {
    id: EntityId;
    roomId: EntityId;
    username?: string;
    text: string;
    timestamp: string;
    isError?: boolean;
    isSent?: boolean;
};

const messageAdapter = createEntityAdapter<MessageEntity>();

export const messagesSlice = createSlice({
    name: "messages",
    initialState: messageAdapter.getInitialState(),
    reducers: {
        messageAdded: {
            reducer: messageAdapter.addOne,
            prepare: ({ roomId, text }) => ({
                payload: {
                    id: nanoid(),
                    roomId,
                    text,
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
