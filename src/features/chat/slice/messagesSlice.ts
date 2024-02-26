import {
    EntityId,
    PayloadAction,
    createEntityAdapter,
    createSlice
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState } from "app/store";

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

const messageAdapter = createEntityAdapter<MessageEntity>();

export const messagesSlice = createSlice({
    name: "messages",
    initialState: messageAdapter.getInitialState(),
    reducers: {
        messageAdded: (
            state,
            { payload: { roomId, ...entity } }: AddMessageAction
        ) => {
            messageAdapter.addOne(state, entity);
        },
        messageRemoved: messageAdapter.removeOne
    }
});

export const { messageAdded, messageRemoved } = messagesSlice.actions;

export const messagesSelectors = messageAdapter.getSelectors<RootState>(
    (state) => state.messages
);

export const getMessagesByIds = (messageIds: EntityId[]) =>
    useSelector((state: RootState) =>
        messagesSelectors
            .selectAll(state)
            .filter(({ id }) => messageIds.includes(id))
    );
