import { createSlice, nanoid } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toasts",
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      state.push(action.payload); // { id, type, message }
    },
    removeToast: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;

//Thunk
export const showToast = (type, message) => (dispatch) => {
  /* V1StGXR8_Z5jdHi6B-myT */
  const id = nanoid();
  dispatch(addToast({ id, type, message }));
  setTimeout(() => dispatch(removeToast(id)), 4000);
};
