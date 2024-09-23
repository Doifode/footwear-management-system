import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";
import { IRegisterShop } from "../../helper/types/Shop";

export const ShopApi = createApi({

    reducerPath: "shopApi",
    tagTypes: ["getShops"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/shop/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        getAllShops: builder.query<apiResponse<[]>, string>({
            query: () => "/",
            providesTags: ['getShops']
        }),
        getShopById: builder.query<apiResponse<IRegisterShop>, string>({
            query: (shopId: string) => `/${shopId}`,
        }),
        disableShop: builder.mutation<apiResponse<[]>, number>({
            query: (shopId: number) => ({ url: `/disable/${shopId}`, method: "DELETE" }),
            invalidatesTags: ['getShops']
        }),
        activateShop: builder.mutation<apiResponse<[]>, number>({
            query: (shopId: number) => ({ url: `/activate/${shopId}`, method: "DELETE" }),
            invalidatesTags: ['getShops']
        }),
        updateShop: builder.mutation<apiResponse<[]>, IRegisterShop>({
            query: (body: IRegisterShop) => ({ url: `/`, method: "PUT", body }),
        }),
        addShop: builder.mutation<apiResponse<[]>, IRegisterShop>({
            query: (body: IRegisterShop) => ({ url: `/`, method: "POST", body }),
        }),
    })
});
export const {
    useGetAllShopsQuery,
    useDisableShopMutation,
    useActivateShopMutation,
    useGetShopByIdQuery,
    useLazyGetShopByIdQuery,
    useUpdateShopMutation,
    useAddShopMutation
} = ShopApi;