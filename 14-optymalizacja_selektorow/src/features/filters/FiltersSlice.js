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

// wedlog podrecznikowej praktyki selektory powinny zaczynac sie od slowka select

export const getStatusFilter = (state) => state.filters.status;
// export const getStatusFilter = (state) => state.filters.status;

export default filtersSlice.reducer;
