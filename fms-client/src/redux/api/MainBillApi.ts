import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";
import { IMainBill } from "../../helper/types/PaymentTypes";
import { IMainBillList } from "../../helper/types/Bill";

export const MainBillApi = createApi({

    reducerPath: "MainBillApi",
    tagTypes: ["getAllMainBills"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/MainBill/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        getAllMainBills: builder.query<apiResponse<IMainBillList[]>, null>({
            query: () => `/`,
            providesTags: ["getAllMainBills"],
        }),
        addMainBill: builder.mutation<apiResponse<IMainBill>, IMainBill>({
            query: (body: IMainBill) => ({ url: `/`, method: "POST", body }),
            invalidatesTags: ["getAllMainBills"],
        })
    })
});
export const {
    useGetAllMainBillsQuery,
    useAddMainBillMutation
} = MainBillApi;