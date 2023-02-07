// jak uzyc w naszej aplikacji reactowej search queries?
// Zaimportujemy sobie hook i zdestrukturyzujemy go. useSearchParams jakto hook, zwroci nam tablice. Parametry ktore nas ineteresuja sa na pierwszej pozycji. Pierwsza pozycja zwraca nam obiekt z elementami ktore sa w wyszukiwaniu. On ma wbudowane metody ktore mozemy uzyc do naszych zapytan.
import { useSearchParams, Link } from "react-router-dom";

// abysmy mogli po zmianie parametrow wyslac zapytanie do serwera to potrzebujemy uzyc useEffect. Do tego jesli ustawimy nowy adres za pomoca klikniecia w cos to nam sie przerenderowuje cala aplikacja. Jednoczesnie stworzylismy sobie link ktory jest fajny bo jest sharowalny i mozemy go wyslac komus innemu i ta osoba bedzie miala dokladnie ten sam stan wyszukiwania. Do tego na podstawie tych parametrow my chcemy zrobic zapytanie do api. Zeby w backend poprosic o liste ktora zawiera tylko np kurtki xl w kolorze blue.
import { useState, useEffect } from "react";

function StoreWall() {
  // jesli dodamy do adresu nasze search query np.: ?category=t-shirt&size=m&color=white to mozemy je wyciagnac za pomoca hooka useSearchParams.

  const [productCategory, setproductCategory] = useState("all");

  const [searchParams, setSearchParams] = useSearchParams();
  // pamietajmy ze searchParams zawsze zwracaja stringi. O tym trzeba pamnietac bo jesli chcemy uzyc go do jakis obliczen to musmi go przekonwertowac na integer i upwenic sie ze to jest na pewno liczba.
  // hook useSearchParams() zwraca tablice gdzie na 1 pozycji zwraca wszystkie parametry wyszukiwania (mozemy pojedynczo je wyciagac (.get) albo wszystkie narazaz (.getAll)), na 2 pozycji zwraca funkcje ktora pozwala te parametry ustawic.

  // console.log(searchParams);
  // mozemy na koncu uzyc logiki or aby wrzucic pusty string jakby nie bylo kategorii. Mozemy sprawdzic czy jest pusty. Pusty string zwraca false.
  const category = searchParams.get("category") || "";
  const size = searchParams.get("size") || "";
  const color = searchParams.get("color") || "";

  // console.log("filters:", { category, size, color });

  // to teraz jak te filtry ustawiac? Narazie je przeczytalismy. Wystarczy ze wejdziemy do naszej tablicy z useSearchParams(), pierwsze to cos co pozwala nam wyczytac po kolei wszystkie parametry przez metode .get, natomiast na 2 miejcu tej tablicy znajduje sie funkcja ktora te parametry ustawia i w naszym setFilter tego uzyjemy aby ustawic parametry. searchParams jest obiektem wiec ustawiamy go jako obiekt w setSearchParams.

  const handleSelectCategory = (event) => {
    const value = event.target.value;
    // console.log(value);
    setproductCategory(value);
  };

  const setFilter = () => {
    setSearchParams({
      category: productCategory,
      size: "medium",
      color: "black",
      maxPrice: "1000",
    });
  };

  // prosimy baze danych aby zwrocila nam liste przedmiotow okreslonych w filtrze. Wiemy juz ze takie zapytania robimy w useEffect. Wiemy tez ze nie chcemy robic tego zawsze kiedy aplikacja sie renderuje a bardziej kiedy zmienia sie pewne dane.

  useEffect(() => {
    // console.log("Call api to request products for filter:");
  }, [searchParams]);
  // dzieki temu ze przekazalismy do useEffect tablice z obiektem ktorego ma nasluchiwac, aplikacja nie bedzie sie renderowac zawsze jak nacisniemy przycisk a tylko wtedy kiedy bedzie jakas zmiana w searchParams, poniewaz my tylko chcemy pytac baze danych gdy zmieniamy zapytanie. Wtedy i tylko wtedy.

  // kolejna rzecza jaka sobie omowimy to obiekt Location ktory zwroci nam pelna informacje odnosnie URL jak pathname, search, hash, state, key. Location pozwala nam dowiedziec sie gdzie jestesmy. Parametr key sluzy do logowania wydazen np jakies klikniecia. Za kazdym razem jak wejdziemy na strone produktu parametr key bedzie inny. Dzieki temu mozemy logowac rozne wejscia lub zabijac cash. Ten klucz bedzie zawsze inny kiedy poruszamy sie postronach przegladarki.

  // Stworzymy sobie link do produktu i strone tego produktu aby przetestowac obiek location.

  // useLocation moze tez byc bardzo przydatne do logowania zmian w jakiejs analizie. np aplikacja do analizowania ruchu.

  return (
    <>
      <h1>Welcome to our store</h1>
      <label htmlFor="category">Category</label>
      <select name="category" id="" onChange={handleSelectCategory}>
        <option value="all">all</option>
        <option value="jacket">jacket</option>
        <option value="hoodie">hoodie</option>
      </select>
      <button onClick={setFilter}>Set params</button>
      {category && <p>Category: {category}</p>}
      {size && <p>Size: {size}</p>}
      {color && <p>Color: {color}</p>}
      <hr />

      <Link
        to="product/123"
        // za pomoca state ustawimy dynamiczny link do powrotu aby miec pewnosc ze wrocimy w to samo miejsce z ktorego przyszlismy wraz z parametrami filtra. Ustawimy swoj klucz "from" ktory przeczytamy na stronie produktu.
        state={{
          from: `/store?category=${category}&size=${size}&color=${color}`,
        }}
      >
        Product 123
      </Link>
    </>
  );
}

export default StoreWall;
