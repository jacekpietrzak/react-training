import { useNavigate, Navigate } from "react-router-dom";
/** Zalozmy ze to jest strona do ktorej maja dostep tylko zalogowani uzytkownicy. Zeby sprawdzic czy sa zalogowani to normalnie odpytujemy jakis serwis. My stworzymy sobie sztuczna zmienna na taka potrzebe.
 */

function Login() {
  // zmienna do sprawdzenia logowania aby symulowac odpowiedz z serwera. Bedziemy ja zmieniac jak potrzebujemy.
  const isAuthenticated = true;
  // do tej pory poznalismy routing w ten sposob ze aby gdzies przejsc to trzeba kliknac w link. Sa sytuacje gdzie chcemy kogos przekierowac ze wzgledu na jakas logike ktora sie wykona. Nie koniecznie po kliknieciu w cos. Mozemy zdecydowac jaki route ma buc dostepny dla kogo.
  // Stworzymy guzik ktory cos bedzie robil i jak na niego klikniemy bedziemy wywolywac metoda ktora pokaze raport. Nie chcemy aby wszyscy je widzieli, tylko osoby ktore sa zalogowane. Raporty sa na osobnej sciezce i chcemy go przekierowac na sciezke. Po kliknieciu w button my robimy cala logike, sprawdzamy czy klikajacy jest zalogowany. Czy ma przywileje do zobaczenia tej strony.

  const navigate = useNavigate();

  const showReports = () => {
    if (isAuthenticated) {
      console.log("ok, show reports");
      // redirect ti reports page now - wydazy sie dzieki hookowi useNavigate. Wyzej ustalillismy zmeinna navigate ktora jest rowna hookowi useNavigate i uzyjemy go ponizej.
      navigate("/reports");
      // to jest sposob na warunkowe przekierowanie pewnych uzytkownikow na storne raportu a innych na strone logowania. Hooka uzywamy nie w JSX a w tradycyjnym kodzie JS do stworzenia logiki
    } else {
      console.log("nope - login first");
    }
  };

  // Navigate za to jest komponentem ktory mozemy uzyc w JSX. Jak go uzyc? Zalozmy ze jest to strona na ktorej ktos ma cos zobaczyc jesli jest zalogowany. Jesli nie bylby zalogowany to mozemy zwrocic JSX. I jesli zrobimy to przed innym JSXem to jesli ten pierwszy sie zrealizuje bo logika dala true to kolejny sie nie zrealizuje. Mozemy uzyc komponentu Navigate ktory nie renderuje sie tylko moze nawigowac gdzies. <Navigate to="adres"/>. My w tym wypadku jesli osoba jest nie zalogowana to przekierujemy ja do strony login-first. Uwaga nie do login bo bedzie blad zapetlenia.

  if (!isAuthenticated) {
    return <Navigate to="/login-first" />;
  }

  return (
    <>
      <h1>Login Page</h1>
      <button onClick={showReports}>Show Reports</button>
    </>
  );
}

export default Login;
