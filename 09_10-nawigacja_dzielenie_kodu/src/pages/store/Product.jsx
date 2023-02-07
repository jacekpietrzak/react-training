import { useLocation, Link } from "react-router-dom";

function Product() {
  const location = useLocation();

  //   console.log(location);
  // obiekt lokacji daje nam parametry takie jak: {pathname, search, hash, state, key}

  return (
    <>
      <h1>Product Details</h1>
      {/* // ustawimy dynamiczny link do powrotu aby miec pewnosc ze wrocimy w to samo miejsce z ktorego przyszlismy wraz z parametrami filtra ktore ustawilismy w store.jsx w parametrze state dla obiektu location. */}
      <Link to={location.state.from}>Go back to search results</Link>
    </>
  );
}

export default Product;
