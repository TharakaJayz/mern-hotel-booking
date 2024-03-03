import { configureStore } from "@reduxjs/toolkit";
import { toastSlice } from "./Toast-slice";
import { userSlice } from "./User-slice";

export const store = configureStore({
  reducer: { toasts: toastSlice.reducer,user:userSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
