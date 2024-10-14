import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRegisterCustomer } from "../../helper/types/Customer";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";

export const CustomerApi = createApi({

    reducerPath: "CustomerApi",
    tagTypes: ["getAllCustomers"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2304/api/Customer/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as IRootState).Auth.userDetails.token
            if (token) {
                headers.set("Authorization", token)
            }
        }
    }),

    endpoints: (builder) => ({
        getAllCustomers: builder.query<apiResponse<IRegisterCustomer[]>, null>({
            query: () => `/`,
            providesTags: ["getAllCustomers"],
        }),
        addCustomer: builder.mutation<apiResponse<[]>, IRegisterCustomer>({
            query: (body: IRegisterCustomer) => ({ url: `/`, method: "POST", body }),
            invalidatesTags: ["getAllCustomers"],
        })
    })
});
export const {
    useGetAllCustomersQuery,
    useLazyGetAllCustomersQuery,
    useAddCustomerMutation
} = CustomerApi;