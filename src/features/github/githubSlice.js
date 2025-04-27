import { createSlice } from "@reduxjs/toolkit";

const githubSlice = createSlice({
  name: "github",
  initialState: {
    activities: [],

    loading: false,
    error: null,
  },
  reducers: {
    fetchActivitiesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchActivitiesSuccess(state, action) {
      state.loading = false;
      state.activities = action.payload;
    },
    fetchActivitiesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchActivitiesStart,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
} = githubSlice.actions;

export default githubSlice.reducer;
