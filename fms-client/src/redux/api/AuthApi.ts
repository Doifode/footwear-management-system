import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiResponse } from "../../helper/types/CommonTypes";
import { ISetPassword, IUserLogin } from "../../helper/types/Auth";

export const AuthApis = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/auth/"
    }),
    endpoints: (builder) => ({
        activateUser: builder.mutation<apiResponse<[]>, ISetPassword>({
            query: (body) => ({
                url: "setPassword",
                method: "PUT",
                body
            })
        }),
        verifyUser: builder.mutation<apiResponse<[]>, IUserLogin>({
            query: (body) => ({ url: "verifyUser", method: "POST", body })
        })
    })
});
export const { useActivateUserMutation, useVerifyUserMutation } = AuthApis