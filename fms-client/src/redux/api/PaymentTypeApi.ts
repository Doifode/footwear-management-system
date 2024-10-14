import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";
import { IPaymentTypes } from "../../helper/types/PaymentTypes";

export const PaymentTypeApi = createApi({

    reducerPath: "PaymentTypeApi",
    tagTypes: ["getAllPaymentTypes"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/payment/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        getAllPaymentTypes: builder.query<apiResponse<IPaymentTypes[]>, null>({
            query: () => `/`,
            providesTags: ["getAllPaymentTypes"],
        }),
    })
});
export const {
    useGetAllPaymentTypesQuery,
} = PaymentTypeApi;