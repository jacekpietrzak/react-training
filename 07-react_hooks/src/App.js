import "./App.css";

// importujemy nasz customowy hook (ponieaz nasz plik z hookami to index.js to nie musimy w sciezce podawac nazwy pliku tylko folder):
import { useToggle } from "./hooks";

// biblioteka hookow react-use
import { useBattery } from "react-use";

// Przed hooks zanim chcielismy uzyc state musielismy korzystac z komponentow klasowych i w tej klasie miec konstruktor i w nim obiekt stanu ktory potem moglismy czytac poprzez this.state albo ustawic ten stan poprzez this.set.state. Aby ich uzyc musimy je zaimportowac z react tak jak wczesniej iportowalismy Component.
import { useState, useEffect } from "react";

function App() {
  /* Dzieki hookom mozemy ustawic stan aplikacji i go przeczytac takze w komponentach funkcyjnych. Nie musimy juz uzywac klasy. Wszystko dzieki useState. useState domyslnie zwraca tablice. */

  /** Jak go uzyc? Najpopularniejszym sposobem uzycia useState jest destrukturyzacja tablicy ktora zwraca useState. */
  // console.log(useState());
  /**  Zrobimy przyklad countera. Destrukturyzujemy tablice useState nadajac odpowiednie nazwy. Na pierwszym miejscu tablicy useState mamy element stany a na drugim funkcje ktora ten stan ustawia. W naszym przypadku elementem jest count a funkcja setCount. Konwencja mowi ze nazwa funkcji to nazwa elementu + set przed nia. np element=count to funkcja=setCount. useState() jako funkcja moze tez przyjac argument ktory ustawia nam domyslna wartosc elementu. W naszym przypadku chcemy aby count mial na start wartosc 0 (count=0) dlatego w useState(0) przekazujemy 0 . Aby uzyc wartosci danego elementu uzywamy standardowo w jsx jego nazwe w nawiasach {count}. Mozemy przyjmowac dowolna wartosc. String, tablica, obiekt, numer*. Przy wywolaniu nie musimy uzywac {this.state.count} tylko po prostu {count}. W przeciwienstwie to klasowego stanu, w stanie hookowym dla kazdego elementu stanu uzywamy nowa instancje useState. Za kazdym razem tworzymy pare element+funkcja. Chyba ze nie potrzebujemy zmieniac elementu to nie potrzebujemy funkcji ale prawdopodobnie gdybysmy tego nie potrzebowali to przyszloby to z propsow i bysmy to po prostu wyswietlili ale skoro chcemy uzyc stanu to jest to jakas interaktywna rzecz. */
  const [count, setCount] = useState(0);
  /** taki zapis odpowiada nam stanu klasowego:
   * const state = {
   * count: 'jeden'
   * }
   */

  const incrementCount = () => {
    setCount(count + 1);
  };

  const [student, setStudent] = useState({ name: "John", age: 20 });
  /** ustawmy sobie funkcje ktora bedzie odpowiedzialna za counter, bedzie zwiekszalo stan o 1
   */

  const updateStudentData = () => {
    /** jesli chcemy aktualizowac tylko jeden klucz w obiekcie, np name to musimy zdestrukturyzowac obiekt student i potem dodac pozycje ktora chcemy uaktualnic. {...student, name:'Jack'}. Dzieki spread operator wszystko co sie znajduje w obiekcie student sie skopiuje a to co chce nadpisac to bedzie wybrany klucz. Tak samo przy tablicy. [...array, ] */
    setStudent({ ...student, name: "Jack" });
  };

  /** useEffect. */
  /** hook ktory ogarnia 3 cykle zycia komponentu (tzw side effects):
   * 1 - componentDidMount
   * 2 - componentDidUpdate
   * 3 - componentWillUnmount
   * dzieki temu mozemy uzywac te efekty w komponentach funkcyjnych. useEffect() bierze 2 argumenty, pierwszy to funkcja a drugi jest opcjonalny. Ta funkcja jest wywolywana odrazu gdy useEffect jest wywolywane. useEffect jest wywolywany w mometach: componentDidMount, componentDidUpdate, componentWillUnmount. Za kazdym razem kiedy nastepuje ten cykl zyciowy komponentu to ta funkcja przekazana do srodka bedzie wywolana. Za kazdym zmianem stanu komponent aktualizuje sie i wywoluje useEffect().
   */

  // odpowiednik componentDidMount - idealne na fetch danych z api. Jesli podamy pusta tablice to callback zostanie wywolany tylko w trakcie montowanie ko,ponentu.
  useEffect(() => {
    console.log("componentDidMount, great for fetch from api");
  }, []);

  // odpowiednik componentDidUpdate
  useEffect(() => {
    console.log("componentDidUpdate for all");
  });

  // odpowiednik componentDidUpdate selective
  useEffect(() => {
    console.log("componentDidUpdate for selected");
    document.title = `${count}`;
  }, [count]);

  // odpowiednik componentWillUnmount
  useEffect(() => {
    // aby wywolac cos w cyklu zyciowym componentWillUnmount wystarczy uzyc return
    return () => {
      // tutaj uzywamy logiki ktora by czyscila nam np fetch, countery, cokolwiek co powinnismy posprzatac podczas odmontowania komponentu.
      console.log("Component will unmount");
    };
  });

  // mozemy i powinnismy uzywac wielu useEffect do nasluchiwania innych rzeczy. Jesli chcemy uzyc tylko raz (np. fetch) to jako drugi argument uzywamy pustej tablicy, Jesli chcemy cos zrobic ze wzgledu na zmiany w stanie w konkretnej pozycji to robimy kolejny efekt i nasluchujemy tylko dla niego.

  // Wlasne hooki
  // zrobimy toggle
  // const [isTrue, setisTrue] = useState(false);

  // const toggle = () => {
  //   setisTrue(!isTrue);
  // };

  // wyeksportowalismy wlasny hook do zwenetrznego pliku w folderze hooks. Dzieki temu mamy jedna linijke kodu ktora wykorzystuje logike z hooka ktora teraz mozemy wykorzystywac w wielu miejscach. np do modalu. W hooku jest wykorzystany kawalek stanu i my juz go nie musimy definiowac w miejscu gdzie korzystamy z hooka. Nie musimy sie tutaj zajmowac obsluga stanu gdyz to zostalo wyrzucone do pliku gdzie mamy zdefiniowanego hooka. Za kazdym razem jak uzyjemy togo hooka to to bedzie inna instancja co oznacza ze kazda instancja ma swoj niezalezny stan. Przy imporcie hooka i destrukturyzacji mozemy zdefiniowac wlasne nazwy dla zmiennej i jej funkcji. To zalezy od nas.
  const [isTrue, setisTrue] = useToggle();

  const batteryState = useBattery();
  console.log("useBattery: ", useBattery());

  if (!batteryState.isSupported) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>not supported</span>
      </div>
    );
  }

  if (!batteryState.fetched) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>supported</span> <br />
        <strong>Battery state</strong>: <span>fetching</span>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-h1">HOOKS</h1>
      </header>
      <h2 className="App-h2">useState</h2>
      <button onClick={incrementCount}>Increment</button>
      <p>count= {count}</p>
      <button onClick={updateStudentData}>Update student</button>
      <p>student name: {student.name}</p>
      <p>student age: {student.age}</p>
      <button onClick={setisTrue}>Toggle</button>
      <p>{isTrue ? "true" : "false"}</p>
      <div>
        <strong>Battery sensor</strong>:&nbsp;&nbsp; <span>supported</span>{" "}
        <br />
        <strong>Battery state</strong>: <span>fetched</span> <br />
        <strong>Charge level</strong>:&nbsp;&nbsp;{" "}
        <span>{(batteryState.level * 100).toFixed(0)}%</span> <br />
        <strong>Charging</strong>:&nbsp;&nbsp;{" "}
        <span>{batteryState.charging ? "yes" : "no"}</span> <br />
        <strong>Charging time</strong>:&nbsp;&nbsp;
        <span>
          {batteryState.chargingTime ? batteryState.chargingTime : "finished"}
        </span>{" "}
        <br />
        <strong>Discharging time</strong>:&nbsp;&nbsp;{" "}
        <span>{batteryState.dischargingTime}</span>
      </div>
    </div>
  );
}

export default App;
