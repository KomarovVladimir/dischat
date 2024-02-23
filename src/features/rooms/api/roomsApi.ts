import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { api } from "app/services/api";
import { Id } from "types";

import { CreateRoomRequest } from "../types";

//TODO: Replace body with params
export const roomsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createRoom: builder.mutation<QueryReturnValue, CreateRoomRequest>({
            query: (body) => ({
                url: "/rooms",
                method: "POST",
                body
            }),
            invalidatesTags: ["Rooms"]
        }),
        joinRoom: builder.mutation<QueryReturnValue, Id>({
            query: (roomId) => ({
                url: `/rooms/${roomId}/join`,
                method: "POST"
            }),
            invalidatesTags: ["Rooms"]
        })
    })
});

export const { useJoinRoomMutation, useCreateRoomMutation } = roomsApi;
