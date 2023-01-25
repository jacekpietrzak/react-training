import { useState, useMemo } from "react";

const Planets = ({ someProp }) => {
  const [planets, setPlanets] = useState(["Earth", "Mars", "Jupiter", "Venus"]);
  const [query, setQuery] = useState("");
  const [clicks, setClicks] = useState(0);

  const filteredPlanets = useMemo(
    () => planets.filter((planet) => planet.includes(query)),
    [planets, query]
  );

  return (
    <div>
      <a href="https://www.w3schools.com/react/react_usememo.asp">
        Good example for using useMemo()
      </a>
      <div>Some prop: {someProp}</div>
      <button onClick={() => setClicks(clicks + 1)}>
        Number of clicks: {clicks}
      </button>
      <div>
        {filteredPlanets.map((planet) => (
          <div key={planet}>{planet}</div>
        ))}
      </div>
    </div>
  );
};

export default Planets;
