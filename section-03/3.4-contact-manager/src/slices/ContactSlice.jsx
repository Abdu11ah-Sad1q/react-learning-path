import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      name: "Ola Nordmann",
      phone: "12345678",
      email: "ola@example.com",
      favorite: false,
    },
    {
      id: 2,
      name: "Kari Hansen",
      phone: "87654321",
      email: "kari@example.com",
      favorite: true,
    },
    {
      id: 3,
      name: "Per Olsen",
      phone: "99887766",
      email: "per@example.com",
      favorite: false,
    },
  ],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const contact = state.list.find((c) => c.id === action.payload);
      if (contact) {
        contact.favorite = !contact.favorite;
      }
    },
    addContact(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const { toggleFavorite, addContact } = contactsSlice.actions;
export default contactsSlice.reducer;
