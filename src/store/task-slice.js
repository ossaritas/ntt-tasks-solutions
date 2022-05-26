import { createSlice } from "@reduxjs/toolkit";

const initialTaskSlice = {
  isLogin: true,
};

const taskSlice = createSlice({
  name: "player",
  initialState: initialTaskSlice,
  reducers: {
    onLogin: (state) => {
      state.isLogin = false;
    },
    onLogout: (state) => {
      state.isLogin = true;
    },
  },
});

export default taskSlice;

export const taskActions = taskSlice.actions;
