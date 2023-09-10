import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from './reducer';

const middlewares = getDefaultMiddleware({serializableCheck: false});

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
