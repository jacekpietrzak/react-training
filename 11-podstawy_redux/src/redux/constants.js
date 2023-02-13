export const statusFilters = Object.freeze({
  // Object.freeze daje to ze nikt go nigdzie przez przypadek nie zmutuje, nadpisze i mamy pewnosc ze wszedzie gdzie jest uzyty bedzie wygladal tak samo jak tutaj. Dobra praktyka aby w constants zamrazac sobie tego typu obiekty.
  all: "all",
  active: "active",
  completed: "completed",
});
