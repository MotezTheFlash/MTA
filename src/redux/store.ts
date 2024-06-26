import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./features/RegisterSlice";
import LoginSlice from "./features/LoginSlice";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
