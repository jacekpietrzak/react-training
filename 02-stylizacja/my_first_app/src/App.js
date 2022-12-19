import "./App.css";
import Card from "./components/Card";
import WarningInline from "./components/WarningInline";
import Warning from "./components/Warning";
import WarningClsx from "./components/WarningClsx";
import WarningModule from "./components/WarningModule";
import BooksList from "./components/BooksList";

const favouriteBooks = [
  { id: "id-1", name: "JS for beginners" },
  { id: "id-2", name: "React basics" },
  { id: "id-3", name: "React Router overview" },
  { id: "id-4", name: "Redux in depth" },
];

const h1Styles = { color: "red", fontWeight: 200 };

const App = () => {
  return (
    <>
      {/* <h1 style={{ color: "red", fontWeight: 200 }} className="Header">
        React - styling & css
      </h1> */}
      <h1 style={h1Styles} className="Header">
        React - styling & css
      </h1>
      <Card
        title="Hello Card Title"
        description="Description of the hello card"
        // price={0}
      />
      <Card
        title="Another Card Title"
        description="Description for second card"
        buttonText="buy now"
        price={299.99}
        // price="50"
      />

      <h2 className="SecondaryHeader">Inline style alerts</h2>

      <WarningInline warningType="danger">
        <h3>This is warning with inline css</h3>
      </WarningInline>
      <WarningInline title="Prop Title" warningType="info">
        <h3>This is warning with inline css</h3>
      </WarningInline>
      <WarningInline title="Prop Title" warningType="success">
        <h3>This is warning with inline css</h3>
      </WarningInline>
      <WarningInline title="Prop Title">
        <h3>This is warning with inline css</h3>
      </WarningInline>

      <h2 className="SecondaryHeader">Seperate css file style alerts</h2>

      <Warning warningType="info" title="Info">
        <h3>This is Warning with external css</h3>
      </Warning>
      <Warning warningType="danger" title="danger">
        <h3>This is Warning with external css</h3>
      </Warning>
      <Warning warningType="success" title="success">
        <h3>This is Warning with external css</h3>
      </Warning>

      <h2 className="SecondaryHeader">clsx</h2>

      <WarningClsx warningType="info" title="Info clsx">
        <h3>This is Warning with clsx</h3>
      </WarningClsx>
      <WarningClsx warningType="danger" title="danger clsx">
        <h3>This is Warning with clsx</h3>
      </WarningClsx>
      <WarningClsx warningType="success" title="success clsx">
        <h3>This is Warning with clsx</h3>
      </WarningClsx>

      <h2 className="SecondaryHeader">Module</h2>
      <WarningModule warningType="info" title="Info module">
        <h3>This is Warning as a module</h3>
      </WarningModule>
      <WarningModule warningType="danger" title="danger module">
        <h3>This is Warning as a module</h3>
      </WarningModule>
      <WarningModule warningType="success" title="success module" hasShadow>
        <h3>This is Warning as a module</h3>
      </WarningModule>

      <BooksList books={favouriteBooks} />
    </>
  );
};

export default App;
