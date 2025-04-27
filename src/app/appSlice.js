import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const selectMode = (state) => state.app.mode;
export const { setMode } = appSlice.actions;

export default appSlice.reducer;
