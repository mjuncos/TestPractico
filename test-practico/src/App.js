import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Busqueda from "./pages/Busqueda/Busqueda.js";
import { Provider } from "react-redux";
import CajaDeBusqueda from "./components/CajaDeBusqueda/CajaDeBusqueda.js";
import Resultados from "./pages/Resultados/Resultados";
import Detalle from "./pages/Detalle/Detalle.js";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <CajaDeBusqueda />
        <Routes>
          <Route path="/" element={<Busqueda />} />
          <Route path="/items" element={<Resultados />} />
          <Route path="/items/:id" element={<Detalle />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
