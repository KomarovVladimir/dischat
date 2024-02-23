import { EntityId, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export type MessageEntity = {
    id: EntityId;
    username: string;
    text: string;
    created?: string;
};

const chatAdapter = createEntityAdapter<MessageEntity>();

export const chatSlice = createSlice({
    name: "chat",
    initialState: chatAdapter.getInitialState(),
    reducers: {
        messageAdded: chatAdapter.addOne,
        messageRemoved: chatAdapter.removeOne
    }
});

export const { messageAdded, messageRemoved } = chatSlice.actions;

export const chatSelectors = chatAdapter.getSelectors(({ chat }) => chat);
