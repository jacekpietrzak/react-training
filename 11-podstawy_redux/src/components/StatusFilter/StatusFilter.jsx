// importujemy hook ktory pozwala nam otrzymac fragment statusu ze store.js ktory nas interesuje. Importujemy generator akcji dispatch
import { useSelector, useDispatch } from "react-redux";
// importujemy generator akcji
import { setStatusFilter } from "../../redux/actions";
// importujemy obiekt wartosci filtra
import { statusFilters } from "../../redux/constants";
import { Button } from "../Button/Button";

import styled from "styled-components";

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;

  .selected {
    background: rgb(32, 153, 48, 1);
    color: #fff;
  }
`;

export function StatusFilter() {
  // otrzymujemy odnosnik do funkcji wysylania akcji
  const dispatch = useDispatch();
  // otrzymujemy wartosc filtra ze statusu Redux
  const filter = useSelector((state) => state.filters.status); // stan mozemy pobrac z kazdego miejsca w aplikacji, poniewaz zdefiniowalismy go w indes.js za pomoca oplatajacego providera

  // wywolujemy generator akcji i przekazujemy wartosc filtra
  // wysylamy wynik - akcja zmiany filtra
  const handleFilterChange = (filter) => dispatch(setStatusFilter(filter));

  return (
    <StyledButtonWrapper>
      <Button
        selected={filter === statusFilters.all}
        onClick={() => handleFilterChange(statusFilters.all)}
      >
        All
      </Button>
      <Button
        selected={filter === statusFilters.active}
        onClick={() => handleFilterChange(statusFilters.active)}
      >
        Active
      </Button>
      <Button
        selected={filter === statusFilters.completed}
        onClick={() => handleFilterChange(statusFilters.completed)}
      >
        Completed
      </Button>
    </StyledButtonWrapper>
  );
}
