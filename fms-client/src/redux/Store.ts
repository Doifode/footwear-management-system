import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootReducer";
import { AuthApis } from "./api/AuthApi";
import persistStore from "redux-persist/es/persistStore";
import { ShopApi } from "./api/ShopApi";
import { UserApi } from "./api/UserApi";
import { CategoryApi } from "./api/CategoryApi";
import { BrandApi } from "./api/BrandApi";
import { ArticleApi } from "./api/ArticleApi";
import { ProductApi } from "./api/ProductApi";
import { ColorApi } from "./api/ColorApi";

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
            )
});;

export const PersistStore = persistStore(store);
