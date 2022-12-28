import "./App.css";
import Counter from "./Components/Counter/Counter";

function App() {
  return (
    <div className="App">
      <header className="App-header">Class component</header>
      <Counter initialValue={0} step={1} />
    </div>
  );
}

export default App;
