import React from "react";
import { render } from "react-dom";
const App = () => <div>Hi Roy</div>;

const root = ReactDOM.createRoot(document.getElementById("root"));
render(
  <>
    <App />
  </>,
  root
);
