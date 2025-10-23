import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';
import dashboardSlice from './slices/dashboard';

export const store = configureStore({
  reducer: {
    auth: loginSlice,
    dashboard: dashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
