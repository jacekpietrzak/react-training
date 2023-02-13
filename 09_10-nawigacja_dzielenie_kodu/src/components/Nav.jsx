/** Stworzymy nawigacje. Normalnie zrbilibysmy to uzywajac <a href> problem w tym rozwiazaniu jest taki ze przeladowuje nam aplikacje. Przez to tracimy caly nasz kontekst, tradimy wszystko co mielismy ewentualnie w innym stanowym komponencie. Wszystko co mielismy do tej pory ustawione, tracimy wraz z przeladowaniem. Resetujemy aplikacje. Dlatego nie powinnismy przeladowywac jej na sztywno.
 * Zamiast tagu <a> uzyjemy czego co daje nam nasza biblioteka react-router-dom czyli {Link}
 * Tak naprawde kompnent {Link} jest super do uzywania w stronie, tekscie itp ale konkretnie do nawigacji mozemy uzyc {NavLink}
 * Co nam daje {NavLink}? Dany link w ktorym sie znajdujemy dostaje clase active.
 */
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/store">Store</NavLink>
      </nav>
    </>
  );
};

export default Nav;
