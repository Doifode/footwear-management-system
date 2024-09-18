import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootReducer";
import { AuthApis } from "./api/AuthApi";
import persistStore from "redux-persist/es/persistStore";

export const store = configureStore({
    reducer: RootReducer,
    middleware: (mid) => mid({ serializableCheck: false }).concat(AuthApis.middleware)
});;

export const PersistStore = persistStore(store);
