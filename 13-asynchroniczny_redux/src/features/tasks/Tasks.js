import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleCompleted,
  selectTasks,
  fetchTasks,
} from "./TasksSlice";
import { selectFilters } from "../filters/FiltersSlice";

export function Tasks() {
  const tasks = useSelector(selectTasks);
  const items = tasks.items;
  const inputRef = useRef(null);

  // console.log("tasks", tasks);
  // console.log("inputRef", inputRef);

  const filtersObject = useSelector(selectFilters);
  const filter = filtersObject.status;

  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskText = inputRef.current.value;
    dispatch(
      addTask({
        // id: nanoid(),
        // tego nie musimy juz przekazywac bo pracujemy z baza danych i ona sama ustala id.
        text: taskText,
        // completed: false,
      })
    );
    inputRef.current.value = "";
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleCompleted = (task) => {
    dispatch(toggleCompleted(task));
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

  const visibleTasks = getVisibleTasks(items, filter);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <h1>Tasks</h1>
      <form onSubmit={handleAddTask}>
        <input type="text" ref={inputRef} />
        <button type="submit">Add task</button>
      </form>
      {tasks.isLoading && <div>Loading...</div>}
      {tasks.error && <div>{tasks.error}</div>}
      {visibleTasks.length === 0 && !tasks.isLoading && (
        <div>No tasks to show</div>
      )}
      {visibleTasks.length > 0 && (
        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompleted(task)}
              />
              {`${task.text} [${task.id}] `}
              <button
                id={task.id}
                type="button"
                onClick={() => handleDeleteTask(task.id)}
                // task.id to payload dla naszej akcji
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
