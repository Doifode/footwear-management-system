import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../../helper/types/Category";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";

export const CategoryApi = createApi({

    reducerPath: "categoryApi",
    tagTypes: ["getCategories"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/category/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        GetAllCategories: builder.query<apiResponse<ICategory[]>, null>({
            query: () => `/`,
            providesTags: ["getCategories"],
        }),
        addCategory: builder.mutation<apiResponse<[]>, ICategory>({
            query: (body: ICategory) => ({ url: `/`, method: "POST", body }),
            invalidatesTags: ["getCategories"],
        })
    })
});
export const {
    useGetAllCategoriesQuery,
    useLazyGetAllCategoriesQuery,
    useAddCategoryMutation
} = CategoryApi;