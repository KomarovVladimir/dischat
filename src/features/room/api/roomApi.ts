import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { api } from "app/services/api";

import { RoomData } from "../types";

//TODO: Add more specific types
export const roomApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRoomData: builder.query<RoomData, string>({
            query: (roomId) => ({ url: `rooms/${roomId}` }),
            providesTags: () => [{ type: "Rooms" }]
        }),
        updateRoom: builder.mutation<
            QueryReturnValue,
            Pick<RoomData, "id" | "name" | "status">
        >({
            query: (body) => ({
                url: `/rooms/${body.id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: [{ type: "Rooms" }]
        })
    })
});

export const { useGetRoomDataQuery, useUpdateRoomMutation } = roomApi;
