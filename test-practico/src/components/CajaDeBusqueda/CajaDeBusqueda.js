import React, { useState } from "react";
import Logo_ML from "../../assets/images/logo.png";
import search from "../../assets/images/search.png";
import { useNavigate } from "react-router-dom";
import "./cajaDeBusqueda.scss";
import { getProducts } from "../../services/productService";

const CajaDeBusqueda = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.length > 0) {
      await getProducts(searchTerm);
      navigate(`/items?search=${searchTerm}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={"bar"}>
      <div className={"barComponentsContainer"}>
        <img
          onClick={() => navigate("/")}
          src={Logo_ML}
          style={{ height: 40 }}
          className={"logo"}
          alt="Logo_ML"
        />
        <div style={{ display: "flex", width: "100%" }}>
          <input
            type="text"
            placeholder="Nunca dejes de buscar"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={"input"}
          />
          <button onClick={handleSearch} className={"search"}>
            <img src={search} alt="search" style={{ height: 20 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CajaDeBusqueda;
