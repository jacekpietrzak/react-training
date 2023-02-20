// selectory to funkcje ktore zwracaja nam kawalek sliceu. wczesniej robilismy to za pomoca export const selectTasks = (state) => state.tasks;
// selektory zlozone to takie ktore nie tylko wybieraja czesc danych ale takze cos z nimi moga zrobic, cos policzyc czy przeknwertowac i zwrocic cos co potrzebujemy. Maja dodatkowa logike.

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStatusFilter } from "../filters/FiltersSlice";
import { createSelector } from "@reduxjs/toolkit";
// create selector umozliwia nam wykorzystanie memoizacji czyli odswierzania tylko jesli w podanych danych cos sie zmieni. Selector memoizowany

axios.defaults.baseURL = "https://63ee2b095e9f1583bdbd6fa5.mockapi.io/api/v1";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axios.get("/tasks");
  // console.log("response", response.data);
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

// wedlog podrecznikowej praktyki selektory powinny zaczynac sie od slowka select

// export const selectTasks = (state) => state.tasks;
export const selectTasks = (state) => state.tasks.items;
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectError = (state) => state.tasks.error;
// const selectStatusFilter = getStatusFilter;
export const selectStatusFilter = (state) => state.filters.status;

export const selectVisibleTasks = createSelector(
  [selectTasks, selectStatusFilter],
  (tasks, statusFilter) => {
    console.log("Calculating visible");
    // jako argumenty tej funkcji przekazujemy wyniki argumentow z tablicy dla createSelector.
    if (!tasks) return [];
    switch (statusFilter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }
);

export const selectTasksCount = createSelector([selectTasks], (tasks) => {
  console.log("Calculating tasks");

  const count = tasks.reduce(
    (acc, tasks) => {
      if (tasks.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }
      return acc;
    },
    { active: 0, completed: 0 }
  );
  return count;
});

export default tasksSlice.reducer;
