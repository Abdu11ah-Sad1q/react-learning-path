import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      // action.payload is the id of the transaction to remove
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
