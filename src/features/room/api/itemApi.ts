import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { api } from "app/services/api";

import { GetItemsRequest, ItemData } from "../types";

export const itemApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query<ItemData[], GetItemsRequest>({
            query: ({ roomId }) => ({
                url: `rooms/${roomId}/items`
            }),
            providesTags: () => [{ type: "Items" }]
        }),

        addItem: builder.mutation<
            QueryReturnValue,
            Pick<ItemData, "roomId" | "name">
        >({
            query: ({ roomId, ...body }) => ({
                url: `/rooms/${roomId}/items`,
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: "Items" }]
        }),
        deleteItem: builder.mutation<
            QueryReturnValue,
            Pick<ItemData, "roomId" | "id">
        >({
            query: ({ roomId, id }) => ({
                url: `/rooms/${roomId}/items/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [{ type: "Items" }]
        })
    })
});

export const { useGetItemsQuery, useAddItemMutation, useDeleteItemMutation } =
    itemApi;
