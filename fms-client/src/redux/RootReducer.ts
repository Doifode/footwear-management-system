import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';
import { ArticleApi } from "./api/ArticleApi";
import { AuthApis } from "./api/AuthApi";
import { BrandApi } from "./api/BrandApi";
import { CategoryApi } from "./api/CategoryApi";
import { ColorApi } from "./api/ColorApi";
import { CustomerApi } from "./api/CustomerApi";
import { PaymentTypeApi } from "./api/PaymentTypeApi";
import { ProductApi } from "./api/ProductApi";
import { ShopApi } from "./api/ShopApi";
import { UserApi } from "./api/UserApi";
import Auth from "./slice/Auth";
import Bill from "./slice/Bill";
import Theme from "./slice/Theme";
import { BillApi } from "./api/GenerateBillAPi";
import { MainBillApi } from "./api/MainBillApi";

const persistReducerConfig = {
    key: "root",
    storage: storageSession,
    version: 1,
    writelist: ["user", "theme"]
}

export default combineReducers({
    Auth: persistReducer(persistReducerConfig, Auth),
    Theme: persistReducer(persistReducerConfig, Theme),
    Bill: persistReducer(persistReducerConfig, Bill),
    [AuthApis.reducerPath]: AuthApis.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [ShopApi.reducerPath]: ShopApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [BrandApi.reducerPath]: BrandApi.reducer,
    [ArticleApi.reducerPath]: ArticleApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [ColorApi.reducerPath]: ColorApi.reducer,
    [CustomerApi.reducerPath]: CustomerApi.reducer,
    [PaymentTypeApi.reducerPath]: PaymentTypeApi.reducer,
    [BillApi.reducerPath]: BillApi.reducer,
    [MainBillApi.reducerPath]: MainBillApi.reducer,
});