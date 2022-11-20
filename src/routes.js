import React from "react";
import { Route, Routes } from "react-router-dom";

import ConversionPage from "./pages/conversion";
import HistoryPage from "./pages/history";

//Routes component containing routes for the whole application
const AppRoutes = () => {
  return (
    <Routes>  
      <Route path="/" element={<ConversionPage/>}></Route>
      <Route path="/history" element={<HistoryPage/>}></Route>
    </Routes>
  );
}

export default AppRoutes;