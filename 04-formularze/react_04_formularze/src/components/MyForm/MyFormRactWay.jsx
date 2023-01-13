// uncontroled form elements

import { Component } from "react";

// aby nie uzupelniac "state" w wielu miejscach, utworzymy stala i przekazemy ja potem do "state". Dzieki temu pola dodajemy tylko w jednym miejscu, w stalej. Aby miec jedno zrodlo prawdy.
const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  date: "",
  acceptTC: false,
  gender: "",
  animal: "",
};

class MyFormReactWay extends Component {
  state = INITIAL_STATE;

  // Handle submit //

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.formSubmissionHandler(this.state);
    this.resetForm();
  };

  // Handle input //
  // Najpierw stworzylismy pojedyncze funkcje do kazdego pola osobno.

  handlerFirstNameChange = (event) => {
    // console.log("FN change", event.target.value);
    this.setState({
      firstName: event.target.value,
    });
  };
  handlerLastNameChange = (event) => {
    // console.log("FN change", event.target.value);
    this.setState(
      {
        lastName: event.target.value,
      },
      () => {
        console.log("Updated state: ", this.state);
      }
    );
  };

  // Poniewaz inputow mozemy miec wiele to duzo lepiej byloby obsluzyc je jedna funkcja generic obslugujaca wszystkie pola

  handleInputChange = (event) => {
    // Stworzylismy funkcje ktora dynamicznie pobiera name z inputu i value ktore wpisujemy.
    // const value = event.target.value;
    // const name = event.target.name;
    // console.log("handleInputChange: ", name, ": ", value);
    // console.log(event);
    // mozemy pobieranie danych jeszcze mocniej zoptymalizowac:
    const { value, name, checked, type } = event.target;
    // console.log(checked);
    // console.log(type);
    this.setState(
      {
        [name]: type !== "checkbox" ? value : checked,
        // Poniewaz checkbox nie posiada "value" tylko "checked" to musimy wprowadzic warunek w naszej funkcji. Uzyjemy ternary oeprator. Sprawdzimy typ inputu i jesli jest to checkbox to wartosc przyjmie to co przyjdzie z checked.
      },
      // Operacja setState jest operacja asynchroniczna. Jesli chcemy uzyc aktualnych danych z state to w tym miejscu po przecinku uzywamy funkcji callback. Jesli zrobilibysmy ta funkcje pozniej to dostaniemy ostatni state a nie aktualny state. Po to jest ten callback.
      () => {
        // console.log("Updated state: ", this.state);
      }
    );
  };

  // handle Reset //
  // stworzymy metode ktora resetuje forme po "submit". Aby zresetowac to ustawiamy state na obiekt z pustymi wartosciami.

  // resetForm = () => {
  //   this.setState({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //   });
  // };

  // aby nie musiec uaktualniac obiektu "state" jak dokladamy inne pola w 2 miejscach mozemy wyrzucic na poczatek (sama gora) komponentu go do jakiejs stalej "const" np. const=INITIAL_STATE. Konwencja mowi o tym ze wszystkie stale piszemy duzymi literami. Uzyjemy tej stalej w naszej metodzie do resetowania formularze. Dzieki temu jestesmy pewni ze mamy te same dane w resecie jak i w naszym state.

  resetForm = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    return (
      <>
        <h2>{this.props.label}</h2>
        <p>
          Hello {this.state.firstName} {this.state.lastName}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <h3>Date of birth</h3>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleInputChange}
          />

          {/* umiemy juz robic inputy typu text i email ale mamy wiele innych typow inputow. np checkbox. 
          Checkbox jest troche bardziej problematyczny. Checkbox nie ma atrybutu "value" ale ma specjalny atrybut "checked" ktory jest boolionem. Czyli moze przyjac albo "true" albo "false"*/}
          <label>
            <input
              type="checkbox"
              name="acceptTC"
              checked={this.state.acceptTC}
              onChange={this.handleInputChange}
            />
            <span>Accept T&C</span>
          </label>

          {/* Teraz zdefiniujemy sobie pare Radio button. SLuzy do wybierania opcji jesli mamy wiecej niz true or false. Radio ma value ale tez checked ktore zwraca true or false. */}
          <section>
            <h3>Gender</h3>
            <label>
              <input
                name="gender"
                type="radio"
                checked={this.state.gender === "Male"}
                value="Male"
                onChange={this.handleInputChange}
              />
              <span>Male</span>
            </label>
            <label>
              <input
                name="gender"
                type="radio"
                checked={this.state.gender === "Female"}
                value="Female"
                onChange={this.handleInputChange}
              />
              <span>Female</span>
            </label>
            <label>
              <input
                name="gender"
                type="radio"
                checked={this.state.gender === "Non-binary"}
                value="Non-binary"
                onChange={this.handleInputChange}
              />
              <span>Non-binary</span>
            </label>
          </section>

          {/* ostatni typ to select/drop down. Select tez ma name. Dodajemy handlera onChange i value. Value jest stringiem ktory dodajemy do bazy danych. Value moze byc tez id. Kazde value podajemy z malej bo jest to dobra praktyka jesli dodajemy dane do bazy danych.*/}
          <section>
            <h3>YOur favourite animal</h3>
            <select
              name="animal"
              value={this.state.animal}
              onChange={this.handleInputChange}
            >
              <option value="">Choose...</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="snake">Snake</option>
              <option value="fish">Fish</option>
            </select>
          </section>

          <button type="submit">submit</button>
          <button type="button" onClick={this.resetForm}>
            Reset form
          </button>
        </form>
      </>
    );
  }
}

export default MyFormReactWay;
