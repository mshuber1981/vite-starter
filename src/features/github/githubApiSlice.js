import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Config (GitHub username)
import config from "../../app/config.json";

const githubApiSlice = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `users/${config.gitHubUsername}`,
    }),
    getUserActivity: builder.query({
      query: () => `users/${config.gitHubUsername}/events?per_page=100`,
    }),
  }),
});

export const { useGetUserQuery, useGetUserActivityQuery } = githubApiSlice;

export default githubApiSlice;
