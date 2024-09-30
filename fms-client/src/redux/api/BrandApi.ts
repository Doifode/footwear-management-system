import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBrand } from "../../helper/types/Brand";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";

export const BrandApi = createApi({

    reducerPath: "BrandApi",
    tagTypes: ["getAllBrands"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/brand/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        getAllBrands: builder.query<apiResponse<IBrand[]>, null>({
            query: () => `/`,
            providesTags: ["getAllBrands"],
        }),
        addBrand: builder.mutation<apiResponse<[]>, IBrand>({
            query: (body: IBrand) => ({ url: `/`, method: "POST", body }),
            invalidatesTags: ["getAllBrands"],
        })
    })
});
export const {
    useGetAllBrandsQuery,
    useLazyGetAllBrandsQuery,
    useAddBrandMutation
} = BrandApi;