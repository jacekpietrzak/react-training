import { Link, Outlet } from "react-router-dom";

function About() {
  return (
    <>
      <h1>About</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint expedita
        vero dicta, nam atque harum alias numquam maxime. Minima ipsam
        repudiandae nam aut adipisci non labore. Cumque porro est
        exercitationem?
      </p>
      <ul className="about-nav">
        <li>
          <Link to="team">Team</Link>
        </li>
        <li>
          <Link to="mission">Mission</Link>
        </li>
        <li>
          <Link to="testimonials">Testimonials</Link>
        </li>
      </ul>

      <section>
        <Outlet />
      </section>
    </>
  );
}

export default About;
