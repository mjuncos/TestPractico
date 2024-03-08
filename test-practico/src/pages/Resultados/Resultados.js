import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Producto from "../../components/Producto/Producto";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./resultados.module.scss";
import { getProducts } from "../../services/productService";

const Resultados = () => {
  const location = useLocation();
  const productos = useSelector((state) => state.products.items);
  const categories = useSelector((state) => state.products.categories);
  const search = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    getProducts(search);
  }, [search]);

  return (
    <div className={styles.breadContainer}>
      <div className={styles.breadcrumb}>
        <Breadcrumb elements={categories} />
      </div>
      <div className={styles.mainContainer}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
            marginBottom: "64px",
          }}
        >
          {productos?.map((producto) => (
            <Producto key={producto.id} {...producto} />
          ))}
          {productos.length === 0 && <div className={styles.noProducts}>No se encontraron productos relacionados a su búsqueda</div>}
        </div>
      </div>
    </div>
  );
};

export default Resultados;
