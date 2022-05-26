import { configureStore } from "@reduxjs/toolkit";

import taskSlice from "./task-slice";

const store = configureStore({
  reducer: taskSlice.reducer,
});

export default store;
