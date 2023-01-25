import { createContext, useContext, useState } from "react";

// tworzymy zmienna UserContext w ktorej bedziemy przechowywac dane dotyczace uzytkownika. Tworzymy poprzez wywolanie createContext
export const UserContext = createContext();
// poniewaz jest to export const, czyli named export to aby importowac to musimy uzyc {}

// tworzymy custom hook useUser. Ten hook jedyne co robi to zwraca nam to co zwraca zmienna UserContext, czyli ten hook pobrany z React po przekazaniu mu UserContext. Ma w sobie obiekt kontekstu z providerem i consumerem.
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  /** jest to zwykly komponent reactowy, dlatego mozemy miec tutaj jakies zmienne, metody, logiki, stan dla tego komponentu.
   * zrobmy sobie interakwywnosc aby czytac i ustawiac username
   * ustalimy state poprzez hooki i w useState ustawimy null bo pozniej chcemy sprawdzac czy jest uzytkownik czy go nie ma.
   */

  const [userName, setUserName] = useState(null);
  const [userAge, setUserAge] = useState(null);

  const logIn = (name, age) => {
    setUserName(name);
    setUserAge(age);
  };

  const logOut = () => {
    setUserName(null);
    setUserAge(null);
  };

  return (
    <UserContext.Provider
      value={{ username: userName, age: userAge, logIn: logIn, logOut: logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
