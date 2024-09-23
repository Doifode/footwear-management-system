import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootReducer";
import { AuthApis } from "./api/AuthApi";
import persistStore from "redux-persist/es/persistStore";
import { ShopApi } from "./api/ShopApi";
import { UserApi } from "./api/UserApi";

export const store = configureStore({
    reducer: RootReducer,
    middleware: (mid) => mid({ serializableCheck: false }).concat(AuthApis.middleware, ShopApi.middleware,UserApi.middleware)
});;

export const PersistStore = persistStore(store);
