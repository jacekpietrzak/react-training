import { Component } from "react";
import { nanoid } from "nanoid";
import css from "./TodoApp.module.css";

const DATA = [
  {
    task: "Wyprowadz psa",
    done: false,
    id: nanoid(),
  },
  {
    task: "Kup mleko",
    done: false,
    id: nanoid(),
  },
  {
    task: "Umyj zeby",
    done: false,
    id: nanoid(),
  },
];

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: DATA,
      newTask: "",
      inputPlaceholder: "add todo",
    };
  }

  //HANDLE INPUT CHANGE
  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      newTask: value,
    });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("shouldComponentUpdate", nextState);
  //   return true;
  // }

  // HANDLE ADD NEW TASK
  handleAddNewTask = () => {
    const { newTask, todos } = this.state;
    if (newTask.length > 0) {
      this.setState({
        todos: [...todos, { task: newTask, done: false, id: nanoid() }],
        newTask: "",
        inputPlaceholder: "add todo",
      });
    } else {
      this.setState({ inputPlaceholder: "type something" });
      return;
    }
  };

  //HANDLE SUBMIT
  handleSubmit = (event) => {
    event.preventDefault();
    this.handleAddNewTask();
  };

  //HANDLE CHECKBOX CHANGE
  handleCheckbox = (index) => {
    const todos = [...this.state.todos];
    todos[index].done = !todos[index].done;
    this.setState({ todos });
  };

  // Mamy podstawowa aplikacje gotowa i teraz chcemy dolozyc mozliwosc zapisywania stanu w local storage. Najlepszym momentem na to bedzie to samo zdazenie z cyklu zycia ktore uzylibysmy dla fetch czyli componentDidMount() {}. Dlaczego? Poniewasz to jest ten moment gdzie wiemy ze wszystkie nasze reactowe kompoenenty juz sie zaladowaly. Mamy state, mamy JSX, mamy metode renderowania ktora sie wywolala i po niej nastepuje wywolanie metody componentDidMount() {} gdyz w tym momencie caly sie zmontowal i tutaj mozemy sprawdzic czy mamy cos w local storage. Tej metody uzywamy gdy chcemy cos dostac z API, localstorage, fetch.
  //HANDLE ADD TO LOCAL STORAGE
  componentDidMount() {
    // poniewaz dane w local storage sa przechowywane jako string to aby moc na nich pracowac w JS musimy je przekonwertowac na obiekt, array no chyba ze sa to proste dane jak string czy liczba. Do tego przy metodzie getItem uzywamy JSON.parse() a przy zapisywaniu JSON.stringify().
    // stworzymy lokalna zmienna w zakresie tej zmiennej i przyporzadkujemy jej nasz local storage.
    // console.log("Component mounted");
    const todos = JSON.parse(localStorage.getItem("todos"));
    // console.log("Todos from local storage:", todos);
    if (todos) {
      this.setState({ todos });
    }
  }

  // COMPONENT DID UPDATE
  // Zapis do local storage mozemy wprowadzic albo w callbacku dla setState() w handlesubmit czyli w sumie u mnie handleAddNewTask() albo w componentDidUpdate() gdzie mamy dostep do aktualnego stanu i tez mamy zawsze wywolanie tej metody kiedy ona sie uaktualnia. Jednak do tego najlepsza jest metoda componentDidUpdate gdyz on sledzi czy zmienil sie stan a poprzedni pomysl aby wrzucic w handleSubmit wrzuca tylko dla dodania taska ale juz np nie dla checkboxa. Musielibysmy umieszczac ta sama funkcje w kilku miejscach a tak mozemy uzyc kroku z cyklu zyciowego i w jednym miejscu bedziemy aktualizowac calosc poniewaz componentDidUpdate wywoluje sie zawsze gdy zmienia sie stan. Cokolwiek sie zmieni w naszej aplikacji, przerenderuje sie to ta metoda musi sie wywolac. To jest powod dlaczego lifecycle metode sa tak przydatne. Tej metody uzywamy jesli chcemy zapisac jakies dane w kazdym momencie kiedy sie cos zmieni w naszym state. Czyli wyslac na serwer, fetch albo local storage. Kazda zmiana stanu albo kazda zmiana propsu (jesli wynieslibysmy stan wyzej do rodzica) powoduje update komponentu.
  // Jesli chcielibysmy byc nastawieni na performacje i nie wysylac co chwile zapytania do api albo serwera kiedy nie ma takiej potrzeby to mozemy zabezpieczyc sie i porownac czy poprzedni stan, prevState (prevState.todos) z tym ktory jest aktualny (this.state.todos), to tylko gdy on jest rozne od siebie to tylkoe wtedy powinienem aktualizowac nasza aplikacje. Czy nie jest to zbedny call do API.
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("componentDidUpdate", this.state);
    if (prevState.todos !== this.state.todos)
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  // Najwazniejsze metody ktore glownie bedziemy uzywac to
  // - constructor()
  // - render()
  // - componentdDidMount()
  // - componentdDidUpdate()

  handleRemove = (index) => {
    // console.log("handleRemove", index);
    const todos = [...this.state.todos];
    const filteredTodos = todos.filter((todo) => {
      return todos.indexOf(todo) !== index;
    });
    console.log("filteredTodos:", filteredTodos);
    this.setState({ todos: filteredTodos });
  };

  render() {
    const { todos, inputPlaceholder } = this.state;
    return (
      <div className={css.TodoApp}>
        <h1>Todo</h1>
        <form onSubmit={this.handleSubmit} className={css.form}>
          {/* <label htmlFor="input">Add todo:</label> */}
          <input
            className={css.input}
            type="text"
            id="input"
            placeholder={inputPlaceholder}
            onChange={this.handleInputChange}
            value={this.state.newTask}
          />

          <button className={css.button} type="submit">
            Add
          </button>
        </form>
        <div>
          <ul className={css.list}>
            {todos.map((todo, index) => {
              return (
                <li key={todo.id} className={css.item}>
                  <div className={css.labelWrapper}>
                    <input
                      className={css.checkbox}
                      id={todo.id}
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => this.handleCheckbox(index)}
                    />
                    <label
                      className={todo.done ? css.labelDone : css.label}
                      htmlFor={todo.id}
                    >
                      {todo.task}
                    </label>
                  </div>
                  {todo.done && (
                    <button
                      className={css.listButton}
                      onClick={() => this.handleRemove(index)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoApp;
