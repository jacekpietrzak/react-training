import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://63ee2b095e9f1583bdbd6fa5.mockapi.io/api/v1";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axios.get("/tasks");
  // console.log("response", response);
  return response.data;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text, thunkAPI) => {
    try {
      const response = await axios.post("/tasks", text);
      // console.log("add task", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      // console.log("task id from delete task", taskId);
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  "tasks/toggleCompleted",
  async (task, thunkAPI) => {
    try {
      // console.log("toggle task", task);
      const response = await axios.put(`/tasks/${task.id}`, {
        completed: !task.completed,
      });
      // console.log("toggle task response", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  // Reducery sluza nam do obslugi akcji synchronicznych a extrareducers do akcji asynchronicznych
  reducers: {
    // reducer ma w sobie akcje
    // addTask: (state, action) => {
    //   console.log("payload", action.payload);
    //   console.log("state", state);
    //   state.push(action.payload);
    // },
    // deleteTask: (state, action) => {
    //   console.log("action", action);
    //   console.log("state", state);
    //   const index = state.findIndex((task) => task.id === action.payload);
    //   state.splice(index, 1);
    // },
    // toggleCompleted: (state, action) => {
    //   const index = state.findIndex((task) => task.id === action.payload.id);
    //   state[index].completed = !state[index].completed;
    // },
  },
  // Reducery sluza nam do obslugi akcji synchronicznych a extrareducers do akcji asynchronicznych. W reducerach dopiero ustawiamy stan.
  extraReducers: {
    [fetchTasks.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      // state.items = [...state.items, ...action.payload];
      state.items = action.payload;
    },
    [fetchTasks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addTask.pending]: (state) => {
      state.isLoading = true;
    },
    [addTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteTask.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      // console.log("payload", action.payload.id);
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      // console.log("deleteTask index", index);
      state.items.splice(index, 1);
    },
    [deleteTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [toggleCompleted.pending]: (state) => {
      state.isLoading = true;
    },
    [toggleCompleted.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      state.items[index].completed = !state.items[index].completed;
    },
    [toggleCompleted.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks;

export default tasksSlice.reducer;
