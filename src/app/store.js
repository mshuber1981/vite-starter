import { configureStore } from "@reduxjs/toolkit";
import githubApiSlice from "../features/github/githubApiSlice";
import appReducer from "./appSlice";
import githubReducer from "../features/github/githubSlice";

export const store = configureStore({
  reducer: {
    [githubApiSlice.reducerPath]: githubApiSlice.reducer,
    app: appReducer,
    github: githubReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(githubApiSlice.middleware);
  },
});
