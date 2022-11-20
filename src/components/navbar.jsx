import React from "react";
import { NavLink } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import "../sass/_navbar.scss";
import {
  CURRENCY,
  CONVERTER,
  CONVERSION_HISTORY,
  EXCHANGE,
  VIEW,
} from "../constants/strings";

const Navbar = () => {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  let activeStyle = {
    borderBottom: `2px solid #0091ea`,
    fontWeight: "bold",
  };

  let currencyConverter = (`${CURRENCY + ' ' +  CONVERTER}`).toUpperCase();
  let viewCurrency = (`${VIEW +  ' ' + CONVERSION_HISTORY}`).toUpperCase();
  return (
    <nav className="navbar plr-96">
      <CurrencyExchangeIcon id="logo"/>
      <p style={{ textTransform: "capitalize" }}>{CURRENCY}</p>
      <p style={{ textTransform: "capitalize", fontWeight: "bold" }}>
        {EXCHANGE}
      </p>
      <NavLink
        className="p-16 ml-16"
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        {currencyConverter}
      </NavLink>

      <NavLink
        className="p-16"
        to="history"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {viewCurrency}
      </NavLink>
    </nav>
  );
};

export default Navbar;
