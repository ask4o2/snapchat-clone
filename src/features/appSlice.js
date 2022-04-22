import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  selectedImage: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action)=> {
      state.user= null
    },
    selectImage: (state, action) => {
      state.selectedImage= action.payload
    },
    resetImage: (state, action) => {
      state.selectedImage= null
    },
  },
});

export const { selectImage, logout, login, resetImage } = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectSelectedImage = (state) => state.app.selectedImage;

export default appSlice.reducer;
