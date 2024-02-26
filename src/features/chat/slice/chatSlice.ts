import {
    EntityId,
    PayloadAction,
    createEntityAdapter,
    createSlice
} from "@reduxjs/toolkit";

// import { chatApi } from "../api";

export type MessageEntity = {
    id: EntityId;
    username?: string;
    text: string;
    timestamp: string;
    isError?: boolean;
    isSent?: boolean;
};

export type AddMessageAction = PayloadAction<
    MessageEntity & { roomId: EntityId }
>;

const chatAdapter = createEntityAdapter<MessageEntity>();

export const chatSlice = createSlice({
    name: "chat",
    initialState: chatAdapter.getInitialState(),
    reducers: {
        messageAdded: (
            state,
            { payload: { roomId, ...entity } }: AddMessageAction
        ) => {
            chatAdapter.addOne(state, entity);
        },
        messageRemoved: chatAdapter.removeOne
    }
});

export const { messageAdded, messageRemoved } = chatSlice.actions;

export const chatSelectors = chatAdapter.getSelectors(({ chat }) => chat);
