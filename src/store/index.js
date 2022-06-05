import { configureStore, combineReducers } from '@reduxjs/toolkit';

import taskSlice from './task-slice';

const appReducer = combineReducers({ task: taskSlice.reducer });

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = initialState;
  }

  return appReducer(state, action);
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
