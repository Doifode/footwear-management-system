import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IColor } from "../../helper/types/Color";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";

export const ColorApi = createApi({

    reducerPath: "ColorApi",
    tagTypes: ["getAllColors"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/color/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        getAllColors: builder.query<apiResponse<IColor[]>, null>({
            query: () => `/`,
            providesTags: ["getAllColors"],
        }),
        addColor: builder.mutation<apiResponse<[]>, IColor>({
            query: (body: IColor) => ({ url: `/`, method: "POST", body }),
            invalidatesTags: ["getAllColors"],
        })
    })
});
export const {
    useGetAllColorsQuery,
    useLazyGetAllColorsQuery,
    useAddColorMutation
} = ColorApi;