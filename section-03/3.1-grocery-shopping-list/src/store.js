import { configureStore } from "@reduxjs/toolkit";
import groceriesReducer from "./groceriesSlice";

export const store = configureStore({
  reducer: {
    groceries: groceriesReducer,
  },
});
