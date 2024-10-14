import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";
import { IBill } from "../../helper/types/PaymentTypes";

export const BillApi = createApi({

    reducerPath: "BillApi",
    tagTypes: ["getAllBills"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/Bill/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        getAllBills: builder.query<apiResponse<IBill[]>, null>({
            query: () => `/`,
            providesTags: ["getAllBills"],
        }),
        addBill: builder.mutation<apiResponse<[]>, IBill>({
            query: (body: IBill) => ({ url: `/`, method: "POST", body }),
            invalidatesTags: ["getAllBills"],
        })
    })
});
export const {
    useGetAllBillsQuery,
    useLazyGetAllBillsQuery,
    useAddBillMutation
} = BillApi;