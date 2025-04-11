import React from "react";
import styles from "./ProductCard.module.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ p }) {
  const { cart, addToCart, isAuthenticated } = useAuth();
  const isInCart = cart?.some(pr => pr.id === p.id);
  const navigate = useNavigate()

  return (
    <div className={styles.col}>
      <div className={styles.card}>
        <img onClick={()=>navigate(`/product/${p.id}`)} src={p.image} alt={p.title} />
        <h4 onClick={()=>navigate(`/product/${p.id}`)}>
          {p.title.slice(0, 12)}{p.title.length>12 && "..."}
        </h4>
        <p>$ {p.price}</p>
        <h5>{p.category}</h5>
        <h6>
          Rating: {p?.rating?.rate}/5 ({p?.rating?.count})
        </h6>
        {isInCart ? (
          <button className={styles.added} disabled>
            Added to Cart
          </button>
        ) : (
          <button className={styles.addCart} onClick={() => isAuthenticated?addToCart(p):navigate("/login")}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}