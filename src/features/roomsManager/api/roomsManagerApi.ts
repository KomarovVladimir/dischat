import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { api } from "app/services/api";
import { RoomData } from "features";
import { Id } from "types";

import { CreateRoomRequest } from "../types";

//TODO: Replace body with params
export const roomsManagerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRooms: builder.query<RoomData[], void>({
            query: () => ({ url: "/rooms" }),
            providesTags: () => [{ type: "Rooms" }]
        }),
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
    useGetRoomsQuery,
    useJoinRoomMutation,
    useLeaveRoomMutation,
    useCreateRoomMutation,
    useDeleteRoomMutation
} = roomsManagerApi;
