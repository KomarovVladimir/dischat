import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { EntityId } from "@reduxjs/toolkit";

import { api } from "app/services/api";

import { CreateRoomRequest } from "../types";
import { RoomEntity } from "../slice";

//TODO: Replace body with params
//TODO: Update the return value
export const roomsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createRoom: builder.mutation<RoomEntity, CreateRoomRequest>({
            query: (body) => ({
                url: "/rooms",
                method: "POST",
                body
            }),
            invalidatesTags: ["Rooms"]
        }),
        joinRoom: builder.mutation<QueryReturnValue, EntityId>({
            query: (roomId) => ({
                url: `/rooms/${roomId}/join`,
                method: "POST"
            }),
            invalidatesTags: ["Rooms"]
        })
    })
});

export const { useJoinRoomMutation, useCreateRoomMutation } = roomsApi;
