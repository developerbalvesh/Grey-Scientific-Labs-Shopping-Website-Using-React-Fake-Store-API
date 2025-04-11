import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PublicLayout from "../../layouts/PublicLayout";
import NotFoundNoLayout from "../notFound/NotFoundNoLayout";
import ProductCardWide from "../../components/ProductCardWide";
import styles from "./Cart.module.css";
import Success from "../success/Success";

export default function Cart() {
  const { cart, clearCart } = useAuth();
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  // Calculate total price
  useEffect(() => {
    if (cart.length) {
      let tot = 0;
      cart.map((p) => {
        tot = tot + p.price;
      });
      setTotal(tot);
    }
  }, [cart]);

  return (
    <PublicLayout>
      {success ? (
        <Success />
      ) : cart.length <= 0 ? (
        <NotFoundNoLayout title="Cart is Empty, Head for shopping!" />
      ) : (
        <div>
          <h2>Checkout Your Orders !</h2>
          <div className={styles.container}>
            <div className={styles.left}>
              {cart?.map((p, i) => {
                return <ProductCardWide key={i} p={p} />;
              })}
              <div className={`hide600 ${styles.void}`}></div>
            </div>
            <div className={styles.right}>
              <h3>Total Amount:</h3>
              <h4>$ {total}</h4>
              <button onClick={handleCheckout}>Checkout !</button>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
