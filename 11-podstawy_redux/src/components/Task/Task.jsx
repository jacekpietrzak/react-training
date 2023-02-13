import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleted } from "../../redux/actions";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

const StyledTask = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  &:hover {
    z-index: 1;
    /* scale: calc(1.005); */
    /* transform: translate(0px, -2px); */
    box-shadow: 0px 0px 25px #d4d4d4;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledCloseButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  &:hover {
    color: rgba(255, 0, 0, 1);
  }
  &:active {
    color: rgba(255, 0, 0, 0.5);
  }
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export function Task({ task }) {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggleCompleted = () => {
    dispatch(toggleCompleted(task.id));
  };

  return (
    <StyledTask>
      <StyledWrapper>
        <StyledCheckbox
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCompleted}
        />
        <p>{task.text}</p>
      </StyledWrapper>
      <StyledCloseButton onClick={handleDeleteTask}>
        <MdClose size={20} />
      </StyledCloseButton>
    </StyledTask>
  );
}
