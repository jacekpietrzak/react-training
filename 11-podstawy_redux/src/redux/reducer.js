// Reducer to jest miejsce w ktorym wykonywany jest jeden taki duzy switch na podstawie akcji ktora sie odbyla. Root Reducer slucha wszystich akcji, starego stanu, laczy te 2 rzeczy i zwraca nowy stan.

import { statusFilters } from "./constants";
import { combineReducers } from "redux";

const tasksInitialState = [
  { id: 0, text: "Learn HTML and CSS", completed: true },
  { id: 1, text: "Get good at JavaScript", completed: true },
  { id: 2, text: "Master React", completed: false },
  { id: 3, text: "Discover Redux", completed: false },
  { id: 4, text: "Build amazing apps", completed: false },
];

// Wykorzystujemy initialState jako domyślną wartość statusu
// const tasksReducer = (state = tasksInitialState, action) => {
//   // Reducer realizuje akcje po wartości właściwości type
//   switch (action.type) {
//     // W zależności od rodzaju akcji będzie się wykonywała inna logika
//     case "tasks/addTask":
//       // Należy zwrócić nowy obiekt statusu
//       return {
//         // w którym są wszystkie dane istniejącego statusu
//         ...state,
//         // i nowa tablica zadań
//         tasks: [
//           // w której są wszystkie istniejące zadania
//           ...state.tasks,
//           // i obiekt nowego zadania
//           action.payload,
//         ],
//       };

//     case "tasks/deleteTask":
//       return {
//         ...state,
//         tasks: state.tasks.filter((task) => task.id !== action.payload),
//       };

//     case "tasks/toggleCompleted":
//       return {
//         ...state,
//         tasks: state.tasks.map((task) => {
//           if (task.id !== action.payload) {
//             return task;
//           }
//           return {
//             ...task,
//             completed: !task.completed,
//           };
//         }),
//       };
//     default:
//       // Każdy reducer otrzymuje wszystkie akcje wysłane do store.
//       // Jeśli reducer nie powinien opracowywać jakiegoś typu akcji,
//       // należy zwrócić istniejący status bez zmian.
//       return state;
//   }
// };

const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case "tasks/addTask":
      return [...state, action.payload];
    case "tasks/deleteTask":
      return state.filter((task) => task.id !== action.payload);
    case "tasks/toggleCompleted":
      return state.map((task) => {
        if (task.id !== action.payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
    default:
      return state;
  }
};

const filtersInitialState = {
  status: statusFilters.all,
};

const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case "filters/setStatusFilter":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

// export const rootReducer = (state = {}, action) => {
//   // Zwracamy obiekt statusu
//   return {
//     // Obu reducerom przekazujemy tylko tę część statusu, za którą odpowiadają
//     tasks: tasksReducer(state.tasks, action),
//     filters: filtersReducer(state.filters, action),
//   };
// };

// zamiast tego u gory mozemy skorzystac z funkcji combineReducers ktora zrobi to samo za nas ale krocej

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});
