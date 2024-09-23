import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";
import { IRegisterUser } from "../../helper/types/User";



export const UserApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/user/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),
    tagTypes: ["getUsers"],
    endpoints: (builder) => ({
        getAllUsersByShopId: builder.query<apiResponse<IRegisterUser[]>, string>({
            query: (shopId: string) => `/${shopId}`,
            providesTags: ['getUsers']
        }),
        addUser: builder.mutation<apiResponse<[]>, IRegisterUser>({
            query: (body: IRegisterUser) => ({ url: `/`, method: "POST", body }),
        }),
        updateUser: builder.mutation<apiResponse<[]>, IRegisterUser>({
            query: (body: IRegisterUser) => ({ url: `/`, method: "PUT", body }),
        }),
        getUserById: builder.query<apiResponse<IRegisterUser>, string>({
            query: (userId: string) => ({ url: `/user/${userId}` }),
        }),

    })
})

export const { useGetAllUsersByShopIdQuery, useAddUserMutation, useUpdateUserMutation, useLazyGetUserByIdQuery } = UserApi