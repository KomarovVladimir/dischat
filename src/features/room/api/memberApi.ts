import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { api } from "app/services/api";

import { MemberData, ExcludeMemberRequest } from "../types";

export const memberApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query<MemberData[], string>({
            query: (roomId) => ({ url: `/rooms/${roomId}/members` }),
            providesTags: () => [{ type: "Members" }]
        }),
        excludeMember: builder.mutation<QueryReturnValue, ExcludeMemberRequest>(
            {
                query: ({ roomId, userId }) => ({
                    url: `/rooms/${roomId}/members/${userId}/exclude`,
                    method: "DELETE"
                }),
                invalidatesTags: [{ type: "Members" }, { type: "Rooms" }]
            }
        )
    })
});

export const { useLazyGetMembersQuery, useExcludeMemberMutation } = memberApi;
