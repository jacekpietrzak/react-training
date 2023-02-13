import { Link } from "react-router-dom";

function Blog() {
  return (
    <>
      <h1>Blog</h1>
      <ul>
        <li>
          <Link to="/blog/sport/post-1">Post 1</Link>
        </li>
        <li>
          <Link to="/blog/pogoda/co-dobrego-w-pogodzie">
            Co dobrego w pogodzie
          </Link>
        </li>
        <li>
          <Link to="/blog/kuchnia/jak-zrobic-jajecznice">
            Jak zrobic jajecznice
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Blog;
