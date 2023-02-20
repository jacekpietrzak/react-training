import React from "react";
import { Tasks } from "./features/tasks/Tasks";
import { Filters } from "./features/filters/Filters";
import "./App.css";
import { TaskCounter } from "./features/TaskCounter/TaskCounter";

function App() {
  return (
    <div className="App">
      <h1>Redux Toolkit App</h1>
      <TaskCounter />
      <Filters />
      <Tasks />
    </div>
  );
}

export default App;
