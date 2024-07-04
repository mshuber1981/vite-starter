// https://redux-toolkit.js.org/rtk-query/overview
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Config
import Config from "../../config.json";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users/${Config.gitHubUsername}`,
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;
