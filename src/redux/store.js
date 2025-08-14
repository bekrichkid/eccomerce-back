// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/authSlice"; // Auth slice'ni o'zing yaratishing kerak

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  // boshqa reducerlarni shu yerga qo‘shasan
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // faqat auth reducer saqlansin
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store yaratish
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist uchun kerak
    }),
});

// Persistor
export const persistor = persistStore(store);
