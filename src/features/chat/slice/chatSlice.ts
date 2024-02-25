import { EntityId, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { chatApi } from "../api";

export type MessageEntity = {
    id: EntityId;
    username: string;
    text: string;
    timestamp?: string;
};

const chatAdapter = createEntityAdapter<MessageEntity>();

export const chatSlice = createSlice({
    name: "chat",
    initialState: chatAdapter.getInitialState(),
    reducers: {
        messageAdded: chatAdapter.addOne,
        messageRemoved: chatAdapter.removeOne
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            chatApi.endpoints.sendMessage.matchFulfilled,
            (state, { payload }) => {
                chatAdapter.addOne(state, payload);
            }
        );
        // builder.addMatcher(
        //     chatApi.endpoints.sendMessage.matchRejected,
        //     (state, { payload }) => {
        //         console.log(payload);

        //         chatAdapter.addOne(state, payload);
        //     }
        // );
    }
});

export const { messageAdded, messageRemoved } = chatSlice.actions;

export const chatSelectors = chatAdapter.getSelectors(({ chat }) => chat);
