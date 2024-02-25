import { api } from "app/services/api";

import { AddRoomRequest } from "../types";
import { RoomEntity } from "../slice";

//TODO: Replace body with params
//TODO: Update the return value
export const roomsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addRoom: builder.mutation<RoomEntity, AddRoomRequest>({
            query: (body) => ({
                url: "/rooms",
                method: "POST",
                body
            }),
            invalidatesTags: ["Rooms"],
            transformResponse: ({ data }) => data
        })
    })
});

export const { useAddRoomMutation } = roomsApi;
