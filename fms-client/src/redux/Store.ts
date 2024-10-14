import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import RootReducer from "./RootReducer";
import { ArticleApi } from "./api/ArticleApi";
import { AuthApis } from "./api/AuthApi";
import { BrandApi } from "./api/BrandApi";
import { CategoryApi } from "./api/CategoryApi";
import { ColorApi } from "./api/ColorApi";
import { CustomerApi } from "./api/CustomerApi";
import { ProductApi } from "./api/ProductApi";
import { ShopApi } from "./api/ShopApi";
import { UserApi } from "./api/UserApi";
import { PaymentTypeApi } from "./api/PaymentTypeApi";
import { BillApi } from "./api/GenerateBillAPi";
import { MainBillApi } from "./api/MainBillApi";

export const store = configureStore({
    reducer: RootReducer,
    middleware: (mid) =>
        mid({ serializableCheck: false })
            .concat(
                AuthApis.middleware,
                ShopApi.middleware,
                UserApi.middleware,
                CategoryApi.middleware,
                BrandApi.middleware,
                ArticleApi.middleware,
                ColorApi.middleware,
                ProductApi.middleware,
                CustomerApi.middleware,
                PaymentTypeApi.middleware,
                MainBillApi.middleware,
                BillApi.middleware,
            )
});;

export const PersistStore = persistStore(store);
