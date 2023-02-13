import styled from "styled-components";

const StyledButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(226, 226, 226);

  &:hover {
    background: rgba(32, 153, 48, 0.75);
    color: #fff;
  }

  &:active {
    background: rgba(32, 153, 48, 1);
    color: #fff;
  }

  /* .selected {
    background: rgb(32, 153, 48, 1);
    color: #fff;
  } */
`;

export function Button({
  // dobrze robic named export aby nie bylo mozliwosc przy imporcie nazywania inaczej tych komponentow. Gdy robimy default export mam wlasnie mozliwosc nazywania inaczej tych komponentow. Przy named export juz nie.
  selected = false,
  type = "button",
  children,
  ...otherProps // tak mozemy przekazac propsy ktorych nie przewidzielismy i one potem wchodza do naszego komponentu
}) {
  return (
    <StyledButton
      className={` ${selected ? "selected" : ""}`}
      type={type}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
}
