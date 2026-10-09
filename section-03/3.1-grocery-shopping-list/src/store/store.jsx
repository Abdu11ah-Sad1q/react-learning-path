import { configureStore } from "@reduxjs/toolkit";
import groceriesReducer from "../slices/groceriesSlice";

export const store = configureStore({
  reducer: {
    groceries: groceriesReducer,
  },
});
