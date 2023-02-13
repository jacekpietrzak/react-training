import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

function WebappTemplate() {
  return (
    <div className="App">
      <header className="App-header">
        <Link className="logo" to="/">
          <h1>React - Routing</h1>
        </Link>
        <Nav />
      </header>
      <main>
        {/* tutaj najlepiej uzyc lazy load. */}
        <Suspense
          fallback={
            <div>
              <p>Loading...</p>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default WebappTemplate;
