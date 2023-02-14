import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter, selectFilters } from "./FiltersSlice";

export function Filters() {
  const filtersObject = useSelector(selectFilters);
  const filter = filtersObject.status;
  const dispatch = useDispatch();

  console.log("filtersObject", filtersObject);
  console.log("filter", filter);
  return (
    <>
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
