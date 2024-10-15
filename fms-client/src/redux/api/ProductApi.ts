import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiResponse, IRootState } from "../../helper/types/CommonTypes";
import { IGetProduct, IGetSizes, IRegisterProduct, ISizeType } from "../../helper/types/Product";

export const ProductApi = createApi({

    reducerPath: "ProductApi",
    tagTypes: ["getAllProducts", "getProductSizeList"],

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
        getAllProducts: builder.query<apiResponse<IRegisterProduct[]>, null>({
            query: () => `/`,
            providesTags: ["getAllProducts"],
        }),
        addProduct: builder.mutation<apiResponse<[]>, IRegisterProduct>({
            query: (body: IRegisterProduct) => ({ url: `/`, method: "POST", body }),
            invalidatesTags: ["getAllProducts"],
        }),
        getProductSizeList: builder.mutation<apiResponse<ISizeType[]>, IGetSizes>({
            query: (body: IGetSizes) => ({ url: `/getSizeList`, method: "POST", body }),
            invalidatesTags: ["getProductSizeList"],
        }),
        updateProduct: builder.mutation<apiResponse<[]>, IRegisterProduct>({
            query: (body: IRegisterProduct) => ({ url: `/`, method: "PUT", body }),
            invalidatesTags: ["getAllProducts"],
        }),
        searchProduct: builder.mutation<apiResponse<IRegisterProduct>, IGetSizes>({
            query: (body: IRegisterProduct) => ({ url: `/searchProduct`, method: "POST", body }),
        }),
        deleteProduct: builder.mutation<apiResponse<IRegisterProduct>, { productId: number }>({
            query: (body: { productId: number }) => ({ url: `/`, method: "DELETE", body })
        }),
        getProductForBilling: builder.mutation<apiResponse<IRegisterProduct[]>, IGetProduct>({
            query: (body: IGetProduct) => ({ url: `/searchBillingProduct`, method: "POST", body })
        })
    }),
});

export const {
    useGetAllProductsQuery,
    useLazyGetAllProductsQuery,
    useAddProductMutation,
    useGetProductSizeListMutation,
    useUpdateProductMutation,
    useSearchProductMutation,
    useDeleteProductMutation,
    useGetProductForBillingMutation
} = ProductApi;