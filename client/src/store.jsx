import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './features/redux/auth/AuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { apiSlice } from "./api/ApiSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,  
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        }).concat(apiSlice.middleware),
    devTools: true,
});

export const persistor = persistStore(store);
