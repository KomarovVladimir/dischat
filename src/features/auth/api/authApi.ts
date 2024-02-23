import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { api } from "app/services/api";

import { AuthUser, UserSignInData, UserSignUpData } from "../types";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        loginRequest: builder.mutation<AuthUser, UserSignInData>({
            query: (body) => ({
                url: "login",
                method: "POST",
                body
            }),
            invalidatesTags: ["Auth"]
        }),
        logoutRequest: builder.mutation<QueryReturnValue, void>({
            query: () => ({
                url: "logout",
                method: "POST"
            }),
            invalidatesTags: ["Auth"]
        }),
        registrationRequest: builder.mutation<QueryReturnValue, UserSignUpData>(
            {
                query: (body) => ({
                    url: "register",
                    method: "POST",
                    body
                }),
                invalidatesTags: ["Auth"]
            }
        )
    })
});

export const {
    useLoginRequestMutation,
    useLogoutRequestMutation,
    useRegistrationRequestMutation
} = authApi;
