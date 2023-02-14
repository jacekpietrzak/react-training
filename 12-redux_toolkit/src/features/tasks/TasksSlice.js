import { createSlice } from "@reduxjs/toolkit";

// reducer jest odpowiedzialny za ustawianie naszego stanu w glownym store.

const initialState = [
  { id: 0, text: "Learn HTML and CSS", completed: true },
  { id: 1, text: "Get good at JavaScript", completed: true },
  { id: 2, text: "Master React", completed: false },
  { id: 3, text: "Discover Redux", completed: false },
  { id: 4, text: "Build amazing apps", completed: false },
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // reducer ma w sobie akcje
    addTask: (state, action) => {
      console.log("payload", action.payload);
      console.log("state", state);
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      console.log("action", action);
      console.log("state", state);
      const index = state.findIndex((task) => task.id === action.payload);
      state.splice(index, 1);
    },
    toggleCompleted: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      state[index].completed = !state[index].completed;
    },
  },
});

export const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks;

export default tasksSlice.reducer;
