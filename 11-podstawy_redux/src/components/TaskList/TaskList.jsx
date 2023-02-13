// importujemy hook do okreslania stanu reduxa
import { useSelector } from "react-redux";

import { Task } from "../Task/Task";

// importujemy obiekt wartosci filtra
import { statusFilters } from "../../redux/constants";

import styled from "styled-components";

const StyledTaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
`;

const getVisibleTaskt = (tasks, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter((task) => !task.completed);
    case statusFilters.completed:
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

export function TaskList() {
  // otrzymujemy tablice zadan ze statusu Redux
  const tasks = useSelector((state) => state.tasks);
  // otrzymujemy wartosc filtra ze statusu Redux
  const statusFilter = useSelector((state) => state.filters.status);
  // obliczamy tablice zadan, ktore nalezy wyswietlic w interfejsie
  const visibleTasks = getVisibleTaskt(tasks, statusFilter);
  return (
    <StyledTaskList>
      {visibleTasks.map((task) => {
        return (
          <li key={task.id}>
            <Task task={task} />
          </li>
        );
      })}
    </StyledTaskList>
  );
}
