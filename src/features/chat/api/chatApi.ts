import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { api } from "app/services/api";

import { PostMessageRequest, MessageData } from "../types";
import { MessageEntity } from "../slice";

//TODO: Add synchronization between users. Make the chat distributed
export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<MessageData[], string>({
            query: (roomId) => ({ url: `rooms/${roomId}/messages` }),
            providesTags: () => [{ type: "Chat" }],
            transformResponse: (response: { messages: MessageData[] }) =>
                response.messages || []
        }),
        sendMessage: builder.mutation<MessageEntity, PostMessageRequest>({
            query: ({ roomId, ...body }) => ({
                url: `rooms/${roomId}/messages`,
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: "Chat" }]
        }),
        deleteMessage: builder.mutation<QueryReturnValue, string>({
            query: (messageId) => ({
                url: `/messages/${messageId}`,
                method: "DELETE"
            }),
            invalidatesTags: [{ type: "Chat" }]
        })
    })
});

export const {
    useGetMessagesQuery,
    useDeleteMessageMutation,
    useSendMessageMutation
} = chatApi;
