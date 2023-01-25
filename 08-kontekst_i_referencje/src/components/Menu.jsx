// aby uzyc kontekstu musimy zaimportowac z userContext customowego hooka ktory daje mozliwosc uzycia tych danych czyli useUser

import { useUser } from "../context/context";

const Menu = () => {
  console.log(useUser());
  const { username, age, logIn, logOut } = useUser();
  return (
    <div>
      {username ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <button onClick={() => logIn("John", 33)}>Login John</button>
      )}
      <p>
        Hello {username ? `${username}` : "stranger"}
        {age && `, age: ${age}`}
      </p>
    </div>
  );
};

export default Menu;
