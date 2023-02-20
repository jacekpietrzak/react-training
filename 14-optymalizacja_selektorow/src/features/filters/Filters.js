import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter, getStatusFilter } from "./FiltersSlice";

export function Filters() {
  // const filtersObject = useSelector(selectFilters);
  const filter = useSelector(getStatusFilter); // zoptymalizowalismy selektor poprzez zdefiniowanie specyficznego selektora w TasksSlice
  // const filter = filtersObject.status;
  const dispatch = useDispatch();

  // console.log("filtersObject", filtersObject);
  // console.log("filter", filter);
  return (
    <>
      <h3>Filter by status</h3>
      <button
        type="button"
        className={filter === "all" ? "active" : ""}
        onClick={() => dispatch(setStatusFilter("all"))}
      >
        All
      </button>
      <button
        type="button"
        className={filter === "completed" ? "active" : ""}
        onClick={() => dispatch(setStatusFilter("completed"))}
      >
        Completed
      </button>
      <button
        type="button"
        className={filter === "active" ? "active" : ""}
        onClick={() => dispatch(setStatusFilter("active"))}
      >
        Active
      </button>
    </>
  );
}
