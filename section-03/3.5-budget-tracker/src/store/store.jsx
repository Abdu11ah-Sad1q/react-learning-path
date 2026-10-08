import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../slices/TransactionSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
