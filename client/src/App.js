import React from "react";
import "materialize-css";

import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const routes = useRoutes();
  return (
    <BrowserRouter>
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            The Guest Book
          </a>
          <ul className="right">
            <li>
              <a className="waves-effect waves-light btn" href="/create">
                Leave a Message
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {routes}
    </BrowserRouter>
  );
}

export default App;
