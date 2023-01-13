import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: "Sarah",
      step: 1,
    };

    this.listRef = React.createRef();
  }
  handleInputChange = (event) => {
    const value = Number(event.target.value);
    this.setState({ step: value });
  };
  handleCounter = () => {
    this.setState({ count: this.state.count + this.state.step });
  };
  handleNameChange = () => {
    this.setState({ name: "John" });
  };

  // Ponizsza metoda inicjalizuje sie tuz przed renderem
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("nextProps:", nextProps);
    // console.log("pevState:", prevState);
    // if (prevState.count === 3) {
    //   return { name: "Sarah Jones" };
    // }
    return null;
  }

  // Ponizsza metoda inicjalizuje sie w momencie gdy zamontuje sie nam komponent. Zainicjalizuje i wyrenderuje. Gdy zmieniamy stan on sie juz nie montuje tylko rerenderuje.
  //Do czego przydatne? Wyobrazmy sobie ze przekazujemy propsy do komponentu, jakas funkcje. Ten komponent jest bardzo istotny dla naszej aplikacji i musimy byc pewnie ze nikt nie podejmie zadnej interakcji z nim zanim on sie nie zmontuje. Np komponent ma przyciski ktore sa wszystkie wyszarzone poki komponent nie bedzie mounted. Jak bedzie mounted to zmieniamy stan. Stan mowi ze komponent jest ready wiec buttony juz sa uzywalne i caly interfejs jest gotowy.
  componentDidMount() {
    console.log("Component Mounted!");
    this.props.callWhenReady();
  }

  //Ponizsza metoda jest wywolywana zaraz przed tym jak komponent ma sie uaktualnic. Ta metoda musi zawsze zwrucic boolean. True or false. Tak jest skonstruowana nawet nazwa ktora zaczyna sie od pytania should? Zauwazmy ze stan sie uaktualnia ale komponent sie nie renderuje gdy nie dostanie true. Moze nam byc to przydatne w sytuacji np jesli dolozymy dodatkowy przycisk ktory zmieni imie z Sarah na John. Nacisniemy go raz. Name sie zmieni ale potem ten przycisk nic wiecej nie zrobi pomimo ze bedziemy go przyciskac ponownie wiele razy bo ma tylko funkcje do zmiany na imie John. Czyli nie ma sensu rerenderowac ponownie komponentu. Moze to byc np ogromna lista, milion wierszy i przerenderowanie tej listy ponownie bedzie kosztowalo niepotrzebnie nowe zasoby i moze wywalic aplikacje. Wiec mozemy zabezpieczyc sie i stwierdzic ze nie robmy bezsensownych aktualizacji. Zrobmy logike i powiedzmy sobie tak:
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate:", {
      nextProps,
      nextState,
    });
    if (
      nextState.name === this.state.name &&
      nextState.count === this.state.count
    ) {
      return false;
    }
    return true;
  }

  //Ponizsza metoda daje nam snap shot tego co jest wyrenderowane, co jest w jsx, dom, vdom. Wydaza sie zaraz przed update, przed przerenderowaniem. Wywolywana gdy wszsytkie zmiany sa gotowe do dodania w DOM. Mozna uzyc do otrzymania wartosci DOM przed aktualizacja, np obecna pozycja suwaka, rozmiar elementu, przed aktualizacja. Jesli zwroce wynik operacji to mam do niego dostep w componentDidUpdate jako snapshot.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate:", { prevProps, prevState });
    const listItemsNumber = this.listRef.current.children.length;
    console.log("listItemsNumber:", listItemsNumber);
    return listItemsNumber;
  }

  //Ponizsza metoda to jest moment gdy komponent sie przerenderowal. Bierze 3 argumenty ale snapshot przekazany jest tylko wtedy gdy wczesniej jest uzyta metoda getSnapshotBeforeUpdate(). Metoda ktora mozemy wywolac gdy nasz widok sie uaktualnil, zmienil. Jesli zwrocilismy wynik dzialania w getSnapshotBeforeUpdate to mozemy uzyskac go jako parametr snapshot
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate:", { prevProps, prevState });
    console.log("snapshot from componentDidUpdate:", snapshot);
  }

  // ponizsza metoda wywoluje sie tuz przed odmontowaniem komponentu. Zazwyczaj logika rodzica decyduje o tym czy element jest montowany czy nie jest montowany. Sam komponent nie moze sie montowac i odmontowac. Moze sie okazac ze nasz komponent jest renderowany warunkowo i chcemy go odmontowac. Odmontowac go mozemy w metodzie render() w miejscu return()
  // np mozemy w glownej czesci APP zrobic warunkowe wyswietlania countera. W state dodamy dodatkowa pozycje showCounter: true - domyslnie chcemy go pokazac ale moze byc sytuacja gdzie nei chcemy go pokazac. Dodamy button ktory bedzie ukrywal nasz komponent. Co my powinnismy tutaj robic? Powinnismy sprzatac. Powinnismy konczyc tutaj eventy ktore moga powodowac niekonczace sie nasluchiwanie czegos albo liczenie czegos (setInterval(), setTimeout()) gdyz moze to spowodowac jakies memory leak albo app crash. clearInterval, clearTimeout, remove eventListener. Bardzo przydatny event aby utrzymac wysoka wydajnosc i dobre zdrowie naszej aplikacji.
  componentWillUnmount() {
    console.log("Component will unmount!");
    // alert("bye bye");
  }

  // Obsluga bledow czyli componentDidCatch(error, info) {} ktory uzywamy wewnatrz komponentu ErrorBoundary. React bardzo lubi zawieszać aplikacje, jeżeli wystąpił jakiś błąd. componentDidCatch działa w przypadku wystąpienia błędu w komponencie-dziecku i pozwala komponentom-rodzicom wyłapywać te błędy. To z kolei umożliwia ich obsługę np. wyświetlenie zapasowowego interfejsu. Dzięki temu, w przypadku wystąpienia błędu, interfejs się nie zawiesi.
  //  Wykorzystuje się do kontroli błędów.
  //  Wyłapuje błędy w dzieciach, ale nie w samym rodzicu.
  //  error - rezultat toString() obiektu błędu
  //  info - obiekt opisujący stack trace

  render() {
    console.log("Component Rendered!");
    //wywalmy blad aby zobacyzc dzialanie komponentu ErrorBoundary
    if (this.state.count > 5) {
      throw new Error("I crashed!!! :)");
    }

    const { count, name, step } = this.state;
    return (
      <div>
        <h2>Counter: Name: {name}</h2>
        <h3>Current count: {count}</h3>
        <input
          type="text"
          placeholder="set step"
          value={step}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleCounter}>increment by {step}</button>
        <button onClick={this.handleNameChange}>Set name to John</button>
        <ul ref={this.listRef}>
          {Array.from({ length: this.state.count }, (_, index) => {
            return <li key={index}>{index}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Counter;
