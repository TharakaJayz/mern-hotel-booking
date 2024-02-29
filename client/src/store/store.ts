import { configureStore } from "@reduxjs/toolkit";
import { toastSlice } from "./Toast-slice";

export const store = configureStore({
  reducer: { toasts: toastSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
