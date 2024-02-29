import {
    EntityId,
    PayloadAction,
    createEntityAdapter,
    createSlice,
    nanoid
} from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "app/store";

export type MessageEntity = {
    id: EntityId;
    roomId: EntityId;
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

export const getMessagesByIds = (messageIds: EntityId[] = []) =>
    useAppSelector((state) =>
        messagesSelectors
            .selectAll(state)
            .filter(({ id }) => messageIds.includes(id))
    );
