import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticle } from "../../helper/types/Article";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";

export const ArticleApi = createApi({

    reducerPath: "ArticleApi",
    tagTypes: ["getAllArticles"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/Article/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        getAllArticles: builder.query<apiResponse<IArticle[]>, null>({
            query: () => `/`,
            providesTags: ["getAllArticles"],
        }),
        addArticle: builder.mutation<apiResponse<[]>, IArticle>({
            query: (body: IArticle) => ({ url: `/`, method: "POST", body }),
            invalidatesTags: ["getAllArticles"],
        })
    })
});
export const {
    useGetAllArticlesQuery,
    useLazyGetAllArticlesQuery,
    useAddArticleMutation
} = ArticleApi;