import React, { useEffect } from "react";
import "./detalle.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { getProduct } from "../../services/productService";
import { setItemError } from "../../store/actions/actions";
import store from "../../store";

const Detalle = () => {
  const { id } = useParams();
  const producto = useSelector((state) => state.products.item);
  const error = useSelector((state) => state.products.itemError);
  const formattedPrice = producto?.price?.amount?.toLocaleString("de-DE");
  const categories = useSelector((state) => state.products.categories);

  useEffect(() => {
    store.dispatch(setItemError(false))
    getProduct(id);
  }, [id]);

  return error ? (
    <div className={"mainContainer"}>
      <div className={"productTitle"}>
        <h1>Parece que el producto no existe!</h1>
      </div>
    </div>
  ) : producto.id?  (
    <div className={"breadContainer"}>
      <div className={"breadcrumb"}>
        <Breadcrumb elements={categories} />
      </div>
      <div className={"mainContainer"}>
        <div className={"productContainer"}>
          <img
            src={producto.picture?.url}
            alt={producto.title}
            className={"productImage"}
          />
          <div className={"productInfo"}>
            <div className={"productCondition"}>
              <p>
                {producto.condition === "new" ? "Nuevo" : "Usado"} - 234
                vendidos
              </p>
            </div>
            <div className={"productTitle"}>
              <h1>{producto.title}</h1>
            </div>
            <div className={"price"}>
              <p>{`$  ${formattedPrice}`}</p>
            </div>
            <button className={"comprar"}>Comprar</button>
          </div>
        </div>
        <div className={"productDescription"}>
          <h1>Descripción del producto</h1>
          <p>{producto.description}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className={"breadContainer"}>
      <div className={"mainContainer"}>
        <div className={"productContainer"}>
   
        </div>
      </div>
    </div>
  );
};

export default Detalle;
