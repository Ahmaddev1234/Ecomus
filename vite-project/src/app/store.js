// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Combine all slices
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','cart'],
};

// Wrap root reducer with persist capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export default store
export default store;
