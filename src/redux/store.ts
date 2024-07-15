import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./features/RegisterSlice";
import LoginSlice from "./features/LoginSlice";
import DevSlice from "./features/DevSlice";
import ProgramSlice from "./features/ProgramSlice";
import ProjectSlice from "./features/ProjectSlice";
import CustomerSlice from "./features/CustomerSlice";
import SaleSlice from "./features/SaleSlice";
import UserSlice from "./features/UserSlice";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
    developer: DevSlice,
    program: ProgramSlice,
    project: ProjectSlice,
    customer: CustomerSlice,
    sale: SaleSlice,
    user: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
