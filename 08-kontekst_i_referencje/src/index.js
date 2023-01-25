/** Jest zasada taka jesli chodzi o importy.
 * 1. Najpierw importujemy rzeczy ktore pochodza z roznych bibliotek (react, biblioteki)
 * 2. Nastepnie importujemy komponenty albo css
 **/

import React from "react";
import ReactDOM from "react-dom/client";
import { UserContext, UserProvider } from "./context/context";
import "./index.css";
import App from "./App";

// const MyContext = createContext();
// console.log(MyContext);

/** createContext jesli wylogujemy to widzimy ze jest to obiekt. Ma on 2 rzeczy ktore napisane sa duzo litera (Consumer, Provider). W react duze litery zazwyczaj oznaczaja ze mamy do czynienia z komponentem.
 * Consumer - To co konsumuje kontekst
 * Provider - To co przekazuje kontekst\
 * Dzieki temu mozemy zagniezdzac konteksty, przekazywac jeden kontekst do drugiego kontekstu.
 */

// context pozwala na przekazanie propsow z pominieciem komponentow. Pozwala tez na ustawienie global state. Stan jest zapisywany w danym komponencie. Nie jest nigdzie przekazywany. Jesli chcemy go przekazac to mozemy to zrobic za pomoca propsow ale bezposrednie z jednego komponentu to drugiego komponentu nie mozemy przekazywac wartosci stanowych od tak. Musimy to przekazac jako prop. Context moze w tym pomoc.

// context przekazuje swoj stan do wszystkich komponentow, dzieci ktore sa owiniete w kontekst.
// aby przeczytac kontekst w jakims dziecku, uzywamy hooka useContext()

// Do demonstracji uzyjemy przyklad kontekstu uzytkownika. Uzytkownik naszej aplikacji to ktos do kogo chcemy sie odwolywac w roznych miejscach naszej aplikacji. Wyswietlic imie w nawigiacji, przywitac ladnie, przekazac informacje do maila itp.

// Po imporcie naszego stworzonego hooka userContext uzywamy go ponizej. Oplatamy nim <App/> uzywajac Provider i dajac mu obowiazkowo value ktore chcemy przekazac wszystkim dzieciom. W tym wypadku bedzie to obiekt ktorzy bedzie przechowywal dane dotyczace usera.

/** W jakich przypadkach sie przydaje?
 * W sytuacji kiedy potrzebujemy czegos globalnie dla calej aplikacji.
 * User - np jesli zalogowany to wyswietlimy jego imie w headerze, mozemy wyswietlac inne komponenty dla uzytkownika zalogowanego i nie zalogowanego. Moze ktos kupil inne produkty to tez mozemy pokaac inne komponenty. Mozemy chciec ukryc dla nie zalogowanych uzytkownikow. Jezeli niema username to sie zaloguj albo zarejestroj
 * theme - np darkmode i lightmode
 * poziom wyswietlanych tresci w zaleznosci od posiadanego konta? np. free, silver, gold
 */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  /** mozemy to zrobic inaczej, ladniej. Zamienimy <UserContext.Provider value{{...}}> na cos ladniejszego np <UserProvider></UserProvider>.
   * 1 - zdefiniujemy zwykly reactowy komponent <UserProvider/> w userContext.js
   * 2 - dzieki temu w root mamy czysciutko i minimalistycznie
   */

  // <UserContext.Provider value={{ username: "John", age: 21 }}>
  //   <App />
  // </UserContext.Provider>

  <UserProvider>
    <App />
  </UserProvider>

  // <React.StrictMode>
  // </React.StrictMode>
);
