import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authApi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import adminApi from "./features/admin/adminApi";
import aboutApi from "./features/about/aboutApi";
import blogApi from "./features/blog/blogApi";
import teamApi from "./features/team/teamApi";
import contactApi from "./features/contact/contactApi";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [adminApi.reducerPath]:adminApi.reducer,
  [aboutApi.reducerPath]:aboutApi.reducer,
  [blogApi.reducerPath]:blogApi.reducer,
  [teamApi.reducerPath]:teamApi.reducer,
  [contactApi.reducerPath]:contactApi.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware,adminApi.middleware,aboutApi.middleware,blogApi.middleware,teamApi.middleware,contactApi.middleware),
});

export const persistor = persistStore(store); 
export default store;
