import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { api } from "app/services/api";
import { Id } from "types";

import { CreateRoomRequest } from "../types";

//TODO: Replace body with params
export const roomsManagerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createRoom: builder.mutation<QueryReturnValue, CreateRoomRequest>({
            query: (body) => ({
                url: "/rooms",
                method: "POST",
                body
            }),
            invalidatesTags: ["Rooms"]
        }),
        deleteRoom: builder.mutation<QueryReturnValue, Id>({
            query: (id) => ({
                url: `/rooms/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Rooms"]
        }),
        joinRoom: builder.mutation<QueryReturnValue, Id>({
            query: (roomId) => ({
                url: `/rooms/${roomId}/join`,
                method: "POST"
            }),
            invalidatesTags: ["Rooms"]
        }),
        leaveRoom: builder.mutation<QueryReturnValue, Id>({
            query: (roomId) => ({
                url: `/rooms/${roomId}/join`,
                method: "DELETE"
            }),
            invalidatesTags: ["Rooms"]
        })
    })
});

export const {
    useJoinRoomMutation,
    useLeaveRoomMutation,
    useCreateRoomMutation,
    useDeleteRoomMutation
} = roomsManagerApi;
