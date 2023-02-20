import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TasksSlice, {
  addTask,
  deleteTask,
  toggleCompleted,
  fetchTasks,
  selectTasks,
  selectIsLoading,
  selectError,
  selectVisibleTasks,
} from "./TasksSlice";
// import { getStatusFilter } from "../filters/FiltersSlice";

export function Tasks() {
  // const tasks = useSelector(selectTasks);
  const tasks = useSelector(selectTasks);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const inputRef = useRef(null);

  // console.log("tasks from selector: ", tasks);

  // console.log("tasks", tasks);
  // console.log("inputRef", inputRef);

  // const statusFilter = useSelector(getStatusFilter);

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

  // wyrzucamy ponizszy kod jako selektor zlozony w TasksSlice. Ogolnie nie chcemy tutaj trzymac jakiejs skomplikowanej logiki. Najlepiej wyciagac ja poza glowny plik. Zyskamy na czytelnosci. Lepszym miejscem jest reduxowy slice.

  // const getVisibleTasks = (tasks, statusFilter) => {
  //   if (!tasks) return [];
  //   switch (statusFilter) {
  //     case "active":
  //       return tasks.filter((task) => !task.completed);
  //     case "completed":
  //       return tasks.filter((task) => task.completed);
  //     default:
  //       return tasks;
  //   }
  // };

  // const visibleTasks = getVisibleTasks(tasks, statusFilter);
  const visibleTasks = useSelector(selectVisibleTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <form onSubmit={handleAddTask}>
        <input type="text" ref={inputRef} />
        <button type="submit">Add task</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {visibleTasks.length === 0 && !isLoading && <div>No tasks to show</div>}
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
