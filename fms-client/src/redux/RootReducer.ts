import { combineReducers } from "@reduxjs/toolkit";
import Auth from "./slice/Auth";
import { AuthApis } from "./api/AuthApi";
import { persistReducer } from "redux-persist"
import storageSession from 'redux-persist/lib/storage/session';
import { ShopApi } from "./api/ShopApi";
import { UserApi } from "./api/UserApi";

const persistReducerConfig = {
    key: "root",
    storage: storageSession,
    version: 1,
    writelist: ["user"]
}

export default combineReducers({
    Auth: persistReducer(persistReducerConfig, Auth),
    [AuthApis.reducerPath]: AuthApis.reducer,
    [ShopApi.reducerPath]: ShopApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer
});