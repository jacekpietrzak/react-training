import React, { useRef } from "react";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleCompleted,
  selectTasks,
} from "./TasksSlice";
import { selectFilters } from "../filters/FiltersSlice";

export function Tasks() {
  const tasks = useSelector(selectTasks);
  const inputRef = useRef(null);

  console.log("tasks", tasks);
  console.log("inputRef", inputRef);

  const filtersObject = useSelector(selectFilters);
  const filter = filtersObject.status;

  const dispatch = useDispatch();

  const handleAddTask = () => {
    const taskText = inputRef.current.value;
    dispatch(
      addTask({
        id: nanoid(),
        text: taskText,
        completed: false,
      })
    );
    inputRef.current.value = "";
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted(id));
  };

  const getVisibleTasks = (tasks, statusFilter) => {
    switch (statusFilter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const visibleTasks = getVisibleTasks(tasks, filter);

  return (
    <>
      <h1>Tasks</h1>
      <input type="text" ref={inputRef} />
      <button onClick={handleAddTask}>Add task</button>
      <ul>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task.id)}
            />
            {task.text}{" "}
            <button
              id={task.id}
              type="button"
              onClick={() => handleDeleteTask(task.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
