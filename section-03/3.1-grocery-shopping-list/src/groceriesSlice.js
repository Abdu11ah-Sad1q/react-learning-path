import { createSlice } from "@reduxjs/toolkit";

const groceriesSlice = createSlice({
  name: "groceries",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const { id, name, quantity, section } = action.payload;

      // same name in any case counts as the same item
      const existing = state.items.find(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, name, quantity, section, bought: false });
      }
    },
  },
});

export const { addItem } = groceriesSlice.actions;
export default groceriesSlice.reducer;
