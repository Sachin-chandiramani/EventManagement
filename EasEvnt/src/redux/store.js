import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
