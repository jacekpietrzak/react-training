import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/TasksSlice";
import filtersReducer from "../features/filters/FiltersSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
});
