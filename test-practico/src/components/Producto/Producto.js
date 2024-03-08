import React from "react";
import Logo_envios from "../../assets/images/shipping.png";
import styles from "./producto.module.scss";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../services/productService";

const Producto = ({ id, title, price, picture, free_shipping }) => {
  const navigate = useNavigate();

  const seeDetails = async () => {
    try {
      const result = await getProduct(id);

      if (result && result.item) {
        navigate(`/items/${id}`);
      } else {
        console.log("Item details not available for id:", id);
      }
    } catch (error) {
      console.log("Error fetching item details:", error);
    }
  };

  const formattedPrice = price.amount.toLocaleString("de-DE");
  return (
    <div className={styles.productContainer}>
      <img
        onClick={seeDetails}
        src={picture}
        alt={title}
        className={styles.productImage}
      />
      <div className={styles.productInfo}>
        <div className={styles.price}>
          <p onClick={seeDetails}>{`$  ${formattedPrice}`}</p>
          {free_shipping && (
            <img
              src={Logo_envios}
              alt={title}
              className={styles.freeShippingIcon}
            />
          )}
        </div>
        <div className={styles.productTitle}>
          <p onClick={seeDetails}>{title}</p>
        </div>
      </div>
      <div className={styles.location}>
        <p>Ubicación</p>
      </div>
    </div>
  );
};

export default Producto;
