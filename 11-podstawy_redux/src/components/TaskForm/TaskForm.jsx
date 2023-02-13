// impoortujemy hook do obslugi wysylania akcji Redux
import { useDispatch } from "react-redux";

// importujemy generator akcji ktory stworzylismy w actions. Funkjca ktora tworzy akcje.
import { addTask } from "../../redux/actions";
import { Button } from "../Button/Button";

import styled from "styled-components";
const StyledForm = styled.form`
  display: flex;
  justify-content: center;
`;

export function TaskForm() {
  // tworzymy odnosnik do funkcji wysylania akcji
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    //   wywolujemy generator akcji i przekazujemy tekst zadania dla payload
    //   wysylamy wynik = akcje utworzenia zadania
    dispatch(addTask(form.elements.text.value));
    form.reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        name="text"
        placeholder="enter task text..."
      />
      <Button className="button" type="submit">
        Add task
      </Button>
    </StyledForm>
  );
}
