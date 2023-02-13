import { Route, Routes, useLocation } from "react-router-dom";
// Codesplitting, sluzy do dynamicznego importowania komponentow. Standardowy import jest statyczny a my chcemy aby to bylo dynamicznie. Do tego mozemy uzyc Lazy i Suspense
import { useEffect, lazy, Suspense } from "react";
/**
 * aby uzyc BrowserRouter w naszej aplikacji musimy zaimportowac inne kompenenty z tej biblioteki.
 */
import "./App.css";
import WebappTemplate from "./components/WebappTemplate";
import Home from "./pages/Home";
import About from "./pages/about/";
import Team from "./pages/about/Team";
import Mission from "./pages/about/Mission";
import Testimonials from "./pages/about/Testimonials";
// Zamiast importowac Contact statycznie mozemy zaimplementowac w naszym kodzie przed otwarciem APP zdeklarowac zmienna Contact (tak samo jak nasz komponent.)
// import Contact from "./pages/Contact";
import Blog from "./pages/blog/";
import Post from "./pages/blog/Post";
import Login from "./pages/Login";
// import StoreWall from "./pages/store/Store";
import Product from "./pages/store/Product";
import NotFound from "./pages/NotFound";

// mozemy tez uzyc useLocation do np logowania miejsca gdzie uzytkownik sie przemieszcza. Uzyjemu useEffect bez tablicy na koncu dzieki czemu bedzie on sie odpalal zawsze przy aktualizacji strony. Kazda akcja ktora robimy bedzie logowana. Dzieki temu mozemy stworzyc swoj wlasny tracking jak sie ludzie przemieszczaja po naszej aplikacji.

// do lazy import deklarujemy zmienna ktora rowna sie metodzie lazy w ktorej deklarujemy anonimowa funkcje strzalkowa w ktorej uzywamy metody import('z adresem elementu'). Kolejnym krokiem jest uzycie Suspense w aplikacji. Musimy jednak wiedziec ze jego ladowanie moze potrwac. Suspensem owijamy cos co chcemy dostac w lazy.
const Contact = lazy(() => {
  console.log("loading Contact");
  // return import("./pages/Contact");
  // Contact zaladuje sie za 5sec. Pokazane tylko po to aby pokazac ze lazy loading dziala. Contact laduje sie za pierwszym razem a potem juz nie.
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(import("./pages/Contact"));
    }, 5000);
  });
});

const StoreWall = lazy(() => {
  console.log("loading Storewall");
  return import("./pages/store/Store");
});

function App() {
  const location = useLocation();
  useEffect(() => {
    // stworzylismy nasza wlasna analize. Wylaczona aby wyczyscic konsole.
    // console.log("location:", location);
  });
  return (
    // Suspensem owijamy cos co chcemy dostac w lazy. Poniewaz my mamy template to duzo lepiej byloby to uzyc tam aby ladowac tylko wnetrze a nie cala aplikacje. Mamy nawigacje do uzycia.
    // <Suspense
    //   fallback={
    //     <div>
    //       <p>Loading...</p>
    //     </div>
    //   }
    // >
    <Routes>
      <Route path="/" element={<WebappTemplate />}>
        {/* Kontener w ktorym bedzie renderowana tresc w zaleznosci od url (Route) w ktorym jestesmy. Routes opakowywuje pojedyncze Route. Sam w sobie nic nie robi ale pozwala abysmy w srodku mogli stworzyc pojedyncze Route. */}
        {/* Jest to troche taki switch ktory patrzy po kolei. Jaki aktualnie mamy path? Jesli warunek jest spelniony to podaje to co dalismy w element. Np. czy path="/"? to daj element=<Home/>
         * Jesli bedzie adres ktory nie jest skonfigurowany to da nam pusta strone. Mozemy to obsluzyc Route'm z path='*' i dac komponent ktory damy jako 404 */}
        {/* Wszystko co dynamiczne, dzieje sie w Routes. To jest nasz wielki switch statement ktory renderuje w zaleznosci jaki url mamy w przegladarce.  */}
        {/* Aby bylo czytelniej mozemy wyrzucic te Routes do odzielnego komponentu i go zaimportowac. */}

        {/* HOME */}
        <Route index element={<Home />} />
        {/* komponent ktory odnosi sie do strony startowej powinien miec zamiast path='/' slowko index */}
        {/* * Route ma 2 atrybuty: #1 - path: sciezka, #2 - element: okreslamy tutaj konkretny element ktory chcemy wyswietlic. Np strona do wyswietlenia. */}

        {/* ABOUT */}
        <Route path="/about" element={<About />}>
          <Route path="team" element={<Team />} />
          <Route path="mission" element={<Mission />} />
          <Route path="testimonials" element={<Testimonials />} />
        </Route>
        {/* BLOG / INDEX */}
        <Route path="/blog" element={<Blog />} />
        {/* BLOG / POST */}
        <Route path="/blog/:category/:postId" element={<Post />} />
        {/* CONTACT */}
        <Route path="/contact" element={<Contact />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Store */}
        <Route path="/store" element={<StoreWall />} />
        <Route path="/store/product/:productId" element={<Product />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
        {/* Wazna jest kolejnosc w definicji. Jesli damy np Route na NotFound na sama gore to zawsze on bedzie sie wykonywal. */}
      </Route>
    </Routes>
    // </Suspense>
  );
}

export default App;
