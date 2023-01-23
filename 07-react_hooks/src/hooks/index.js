import { useState } from "react";

//custom hook to nic innego jak funkcja ktora musi zaczac sie od slowka use. Mozemy stworzyc plik w ktorym stworzymy wlasne hooki i bedziemy je eksportowac poprzez named export. Kazdy hook ma swoj stan dlatego musimy zaimportowac useState z react i funkcje ktora cos robi w ciele hooka. Kazdy hook musi cos zwrocic. To moze byc tablica ale tez moze byc obiekt.

export const useToggle = (initialValue = false) => {
  const [isTrue, setisTrue] = useState(initialValue);

  const toggle = () => {
    setisTrue(!isTrue);
  };

  // zwrocimy tablice, w pierwszym miejscu zwrocimy ta nasza zmienna. To co faktycznie ma wartosc. Druga rzecza ktora zwracamy to jest ta funkcja toggle. Mozemy tez powiedziec ze useToggle() moze przyjac jakas wartosc, np initialValue. Mozemy zrobic domyslna wartosc jesli nikt nic nie przekaze poprzez initialValue=domyslna wartosc.
  return [isTrue, toggle, initialValue];
};
