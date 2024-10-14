import { IRegisterProduct } from "./Product";

export interface apiResponse<T> {
    data: T,
    message: string,
    success: boolean
}
interface IUserDetails {
    token: string;
    userId: number;
    firstName: string;
    lastName: string;
    shopId: number;
    mobileNo: number;
    email: string;
    userName: string;
    createdBy: number;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
    roleId: number;
    isActive: number;
}

interface IAuth {
    userDetails: IUserDetails;
}
interface ITheme {
    mode: "dark" | "light";
}

interface IApiConfig {
    online: boolean;
    focused: boolean;
    middlewareRegistered: boolean;
    refetchOnFocus: boolean;
    refetchOnReconnect: boolean;
    refetchOnMountOrArgChange: boolean;
    keepUnusedDataFor: number;
    reducerPath: string;
    invalidationBehavior: string;
}

interface IApi {
    queries: Record<string, unknown>;
    mutations: Record<string, unknown>;
    provided: Record<string, unknown>;
    subscriptions: Record<string, unknown>;
    config: IApiConfig;
}
interface IBillProduct {
    activeBillProduct: IRegisterProduct[],
    totalValues: {
        itemsValue: number,
        payableAmount: number,
        total: number,
        discount: number
    }
}
export interface IRootState {
    Auth: IAuth;
    Theme: ITheme;
    api: IApi;
    Bill: IBillProduct;
}
