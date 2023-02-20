import { useSelector } from "react-redux";
import { selectTasksCount } from "../tasks/TasksSlice";

export const TaskCounter = () => {
  //   const tasks = useSelector(selectTasks);

  //   const count = tasks.reduce(
  //     (acc, tasks) => {
  //       if (tasks.completed) {
  //         acc.completed += 1;
  //       } else {
  //         acc.active += 1;
  //       }
  //       return acc;
  //     },
  //     { active: 0, completed: 0 }
  //   );

  const count = useSelector(selectTasksCount);

  return (
    <div>
      <h3>Tasks</h3>
      <p>Active: {count.active}</p>
      <p>Completed: {count.completed}</p>
    </div>
  );
};
