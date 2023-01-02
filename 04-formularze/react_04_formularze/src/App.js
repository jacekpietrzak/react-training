import "./App.css";
import MyForm from "./components/MyForm/MyForm";
import MyFormReactWay from "./components/MyForm/MyFormRactWay";

function App() {
  return (
    <div className="App">
      <header className="App-header">React Forms</header>
      <MyForm
        label="Uncontrolled form"
        formSubmissionHandler={(data) => {
          console.log("Form is calling", data);
        }}
      />
      <MyFormReactWay
        label="Controlled form"
        formSubmissionHandler={(data) => {
          console.log("Form is calling", data);
        }}
      />
    </div>
  );
}

export default App;
