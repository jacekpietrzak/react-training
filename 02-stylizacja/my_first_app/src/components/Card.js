import "./Card.css";
import PropTypes from "prop-types";

const Card = ({ title, description, price, buttonText = "default text" }) => {
  return (
    <article className="Card">
      <h2>{title}</h2>
      <p>{description}</p>
      {/* {price && <p>Price: ${price}</p>} */}
      {/* {typeof price != "undefined" && price > 0 ? (
        <p>Price: ${price}</p>
      ) : (
        <p>Price: Free</p>
      )} */}
      {/* <p>Don't miss out - {price > 0 ? `it's only ${price}` : `It's free`}</p> */}
      {/* {price > 0 ? <p>Price: ${price}</p> : <p>Price: It's free</p>} */}

      {/* zrobimy dodatkowe sprawdzenie czy cena jest podana. Jesli tak to
      wyrenderuje jesli nie to nie pokaze nic. */}
      {price && (
        <>{price > 0 ? <p>Price: ${price}</p> : <p>Price: It's free</p>}</>
      )}
      <button className="Button">{buttonText}</button>
    </article>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  price: PropTypes.number,
};

export default Card;
