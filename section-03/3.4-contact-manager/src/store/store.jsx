import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../slices/ContactSlice.jsx";
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
