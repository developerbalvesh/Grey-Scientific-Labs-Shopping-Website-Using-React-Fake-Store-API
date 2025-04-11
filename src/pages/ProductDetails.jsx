import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoadingPage from "./LoadingPage";
import { publicCommunication } from "../communication/publicCommunication";
import styles from "./ProductDetails.module.css";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { cart, addToCart, isAuthenticated } = useAuth();
  const isInCart = cart?.some((pr) => pr.id === product?.id);
  const [products, setProducts] = useState([]);

  const getProduct = async (id) => {
    setLoading(true)
    const product = await publicCommunication.getSingleProduct(id);
    if (product) {
      setProduct(product);
      setLoading(false);
    }
    setLoading(false);
  };

  const getByCategory = async (cat) => {
    const data = await publicCommunication.getProductsByCategory(cat);
    if (data) {
      setProducts(data);
    }
  };

  useEffect(() => {
    if (params.id) {
      getProduct(params.id);
      window.scrollTo(0, 0);
    }
  }, [params.id]);

  useEffect(() => {
    if (product?.category) {
      getByCategory(product?.category);
    }
  }, [product]);

  return (
    <PublicLayout>
      {loading ? (
        <LoadingPage />
      ) : !product?.title ? (
        <div className={styles.notFound}>
          <h4>No Product Found !</h4>
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.left}>
              <img src={product.image} alt={product.title} />
              {isInCart ? (
                <button
                  onClick={() => navigate("/cart")}
                  className={styles.gotoCart}
                >
                  Go to Cart
                </button>
              ) : (
                <button
                  onClick={() =>
                    isAuthenticated ? addToCart(product) : navigate("/login")
                  }
                  className={styles.add}
                >
                  Add to Cart
                </button>
              )}
            </div>
            <div className={styles.right}>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <h2>$ {product.price}</h2>
              <h3>{product.category}</h3>
              <div className={styles.rating}>
                <p>
                  <strong>Rating:</strong> <span>{product.rating.rate}/5</span>
                  {` (${product.rating.count})`}
                </p>
              </div>
            </div>
          </div>
          {products.length > 0 && <h2>Here's More!</h2>}
          <div className={styles.products}>
            {products.length > 0 &&
              products?.map((p, i) => {
                return <ProductCard key={i} p={p} />;
              })}
          </div>
        </>
      )}
    </PublicLayout>
  );
}
