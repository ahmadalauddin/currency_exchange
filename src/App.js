import React from "react";
import Navbar from "./components/navbar";
import AppRoutes from "./routes";
import "./sass/_app.scss";

const App = () => {
  return (
    <div id="currency-exchange-app">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
