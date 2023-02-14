import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setStatusFilter } = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;
