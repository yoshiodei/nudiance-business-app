import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'company',
  storage,
};

const persistedReducer = persistReducer(persistConfig, companyReducer);

export const store = configureStore({
  reducer: {
    company: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;









// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './slices/counterSlice';
// import companyReducer from './slices/companySlice';


// const persistMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
//   const result = next(action);
//   return result;
// };

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     company: companyReducer,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;