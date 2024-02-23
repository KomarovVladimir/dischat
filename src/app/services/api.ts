import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

//TODO: Add headers preparation
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1"
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
    baseQuery: baseQueryWithRetry,
    tagTypes: ["Rooms", "Chat"],
    endpoints: () => ({})
});
