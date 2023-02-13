import { StatusFilter } from "./components/StatusFilter/StatusFilter";
import { TaskList } from "./components/TaskList/TaskList";
import { TaskForm } from "./components/TaskForm/TaskForm";

import "./App.css";

// Redux sluzy do tego aby przechowywac stan globalny w jednym miejscu. Bedzie glownym i jedynym zrodlem prawdy aplikacji. Wszystko co wykracza poza stan lokalnego komponentu ktory sluzy tylko do jakis wizualnych aspektow powinien kontaktowac sie z glownym stanem.

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Podstawy Redux</h1>
      </header>
      <section>
        <div className="container">
          <div className="wrapper">
            <TaskForm />
            <StatusFilter />
          </div>
          <TaskList />
        </div>
      </section>
    </div>
  );
}

export default App;
