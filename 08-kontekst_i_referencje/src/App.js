import { useEffect, useRef } from "react";

import "./App.css";
import Menu from "./components/Menu";
import RegisterUser from "./components/RegisterUser";
import Player from "./components/Player";
import Planets from "./components/Planets";

/** useRef to taki specjalny hook ktory pozwala nam przypisac powiazanie z elementem DOM z tradycyjnego HTML do zmiennej ktorej chcemy uzyc w komponencie. Przewaznie mozemy uzywac specjalnych Reactowych funkcji jak onClick albo onChange aby dostac sie do HTMLa ale sa czasami takie sytuacje kiedy chcemy dostac sie do prawdziwego HTMLa np.:
 * - mamy do czynienia z jakas zewnetrzna biblioteka ktora uzywa HTMLowych elementow
 * - lightbox ktory nie jest reactowy albo jakas inna biblioteka vanilla js ktora nie jest przystosowana do obslugi Reacta
 */

function App() {
  // stworzmy sobie jakis button i chcielibysmy zeby do niego byla dopieta jakas referencja. Wystarczy ze zdefiniujemy zmienna do ktorej przyporzadkujemy useRef() i jesli chcemy ja powiazac z button to jedyne co trzeba zrobic to w obiekcie html (tutaj button) dodajemy atrybut ref={myBtnRef} z przekazana zmienna referencji. W pewnym sensie taki query selector na sterydach w react ktory daje wiecej mozliwosci niz jakbysmy mieli uzyc standardowego np. query selector by id.
  // co mi to daje? Tyle ze mozemy do tego buttona cos przypisac.
  // jednak po odswierzeniu aplikacji wszystko sie wysypalo. Dlatego ze do tych refow mamy dostep dopiero po zamontowaniu elementu bo nie wywolala sie jeszcze metoda render a my probujemy juz wylogowac cos czego niema.
  // Aby przejsc do tego stanu zyciowego, powinnismy uzyc hoola useEffect()

  const myBtnRef = useRef();
  // console.log("myBtnRef", myBtnRef.current);
  // myBtnRef.current.addEventListener("click", () => {
  //   console.log("clicked ref");
  // });

  // jesli chcemy byc pewnie ze uzyjemy czegos co jest zamontowane to musimy uzyc useEffect()

  useEffect(() => {
    console.log("myBtnRef", myBtnRef.current);
    myBtnRef.current.addEventListener("click", () => {
      console.log("My Ref Button clicked");
      myInputRef.current.value = "My Ref Button clicked";
    });
  });

  // uzyjmy useRef do inputu. useRef(argument) moze wziac sobie jakis argument
  // Sensownym uzyciem useRef jest przyklad video gdzie odnosnimy sie do tagu hmtl video i jego wbudowanyhc metod play i pause

  const myInputRef = useRef("Hello");

  /** useMemo to metoda uzywana w sytuacji kiedy mamy jakies ciezkie obliczenia i teobliczenia zaleza od propsow albo zmian stanu.
   * np. ktos wybral filtr gdzie wybral ze chce buty damskie, w kolorze takim, w przedziale cenowym i z 1000 artykulow wybralismy 100. Oprocz tego jeszcze klika sobie na to aby aktywowac rabat i ten rabat zmienil stan aplikacji i moze kontekst ogolny ze potem jak przejdzie do checkoutu to ten rabat zostanie zastosowany. Mimo ze wszytko sie przerenderowalo, nawigacja, popup ktory mowi "brawo udalo ci sie wykorzystac twoj rabat" ale ta operacja filtrowania zajela duzo czasu i duzo computing power zostalo wykorzystane na wytworzenie i wyrenderowanie takiej skomplikowanej listy produktow. I mimo ze inne komponenty sie przerenderowaly to ja nie chce przerenderowywac tej listy produktow ponownie i do tego sluzy memoizacja, w przypadku React jet to hook useMemo() ktory pozwala nam takie rzeczy zrobic.
   * Jak uzywamy?
   * - tworzymy sobie jakas zmienna ktora uzywa useMemo()
   * - useMemo w pierwszym argumencie uzywa np jakas funkcje ktora wykonuje jakas skomplikowana operacje. a potem bierze tablice zmiennych na ktorych ona polega. Jesli te zmienne sie zmienia to ta funkcja sie wywola. W przeciwnym razie ta funkcja sie nie wywola i te ciezkie obliczenia nie beda ponownie sie wykonywac.
   */

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-logo" alt="logo">
          REACT useContext, useRef & useMemo
        </p>
      </header>
      <section>
        <h2>useState, createContext, useContext</h2>
        <RegisterUser />
        <Menu />
      </section>
      <section>
        <h2>useRef</h2>
        <button ref={myBtnRef}>My Ref Button</button>
        <input
          type="text"
          ref={myInputRef}
          value={myInputRef.current}
          readOnly={true}
        />
      </section>
      <section>
        <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />
      </section>
      <section>
        <h2>useMemo</h2>
        <Planets someProp={"Some props from app"} />
      </section>
    </div>
  );
}

export default App;
