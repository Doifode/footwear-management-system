import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../helper/types/Product";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";

export const ProductApi = createApi({

    reducerPath: "ProductApi",
    tagTypes: ["getAllProducts"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/product/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        getAllProducts: builder.query<apiResponse<IProduct[]>, null>({
            query: () => `/`,
            providesTags: ["getAllProducts"],
        }),
        addProduct: builder.mutation<apiResponse<[]>, IProduct>({
            query: (body: IProduct) => ({ url: `/`, method: "POST", body }),
            invalidatesTags: ["getAllProducts"],
        })
    })
});
export const {
    useGetAllProductsQuery,
    useLazyGetAllProductsQuery,
    useAddProductMutation
} = ProductApi;