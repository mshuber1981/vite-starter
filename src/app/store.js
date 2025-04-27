import { configureStore } from "@reduxjs/toolkit";
import githubApiSlice from "../features/github/githubApiSlice";
import appReducer from "./appSlice";
import counterReducer from "../features/counter/counterSlice";
import githubReducer from "../features/github/githubSlice";

export const store = configureStore({
  reducer: {
    [githubApiSlice.reducerPath]: githubApiSlice.reducer,
    app: appReducer,
    counter: counterReducer,
    github: githubReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(githubApiSlice.middleware);
  },
});
