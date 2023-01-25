import { useState } from "react";
import { useUser } from "../context/context";

const RegisterUser = () => {
  const { logIn } = useUser();
  const [value, setValue] = useState("");

  return (
    <>
      <input
        value={value}
        type="text"
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={() => logIn(value)}>Register</button>
    </>
  );
};

export default RegisterUser;
