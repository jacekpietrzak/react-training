import { nanoid } from "nanoid";

// akcje w Redux to obiekty ale tez moga to byc funkcje kotre zwracaja obiekty. Type jest obowiazkowy a payload nie. Jednak payload przenosi dane ktore chcemy ustawic w glownym stanie.

export const addTask = (text) => {
  return {
    type: "tasks/addTask",
    payload: {
      id: nanoid(),
      completed: false,
      text,
    },
  };
};

export const deleteTask = (taskId) => {
  return {
    type: "tasks/deleteTask",
    payload: taskId,
  };
};

export const toggleCompleted = (taskId) => {
  return {
    type: "tasks/toggleCompleted",
    payload: taskId,
  };
};

export const setStatusFilter = (value) => {
  return {
    type: "filters/setStatusFilter",
    payload: value,
  };
};
