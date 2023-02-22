import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createBlacklistFilter } from "redux-persist-transform-filter";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const saveSubsetBlacklistFilter = createBlacklistFilter("auth", ["error"]);

const persistConfig = {
  key: "root",
  storage,
  transforms: [saveSubsetBlacklistFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
