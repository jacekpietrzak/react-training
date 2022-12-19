import "./App.css";
import Card from "./components/Card";
import Warning from "./components/Warning";
import BooksList from "./components/BooksList";

const favouriteBooks = [
  { id: "id-1", name: "JS for beginners" },
  { id: "id-2", name: "React basics" },
  { id: "id-3", name: "React Router overview" },
  { id: "id-4", name: "Redux in depth" },
];

// const name = "John Smith";

// const myContainer = (
//   <div>
//     <h1>Hello {name}</h1>
//   </div>
// );

// const Card = (props) => {
//   console.log(props);
//   return (
//     <article>
//       <h2>{props.title}</h2>
//       <p>{props.description}</p>
//     </article>
//   );
// };

const App = () => {
  return (
    <>
      <h1 className="Header">React - intro</h1>
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

      <Warning>
        <h3>This is an important warning</h3>
      </Warning>
      <Warning title="Super warning">
        <h3>This is an another warning</h3>
      </Warning>

      <BooksList books={favouriteBooks} />
    </>
  );
};

export default App;
