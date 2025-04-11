import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoadingPage from "./LoadingPage";
import { publicCommunication } from "../communication/publicCommunication";
import styles from './ProductDetails.module.css'

export default function ProductDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  const getProduct = async (id) => {
    const product = await publicCommunication.getSingleProduct(id);
    if (product) {
      setProduct(product);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (params.id) {
      getProduct(params.id);
    }
  }, []);

  return (
    <PublicLayout>
      {loading ? (
        <LoadingPage />
      ) : !product?.title ? (
        <div className={styles.notFound}>
          <h4>No Product Found !</h4>
        </div>
      ) : (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={product.image} alt={product.title} />
                <button className={styles.add}>Add to Cart</button>
                <button className={styles.gotoCart}>Go to Cart</button>
            </div>
            <div className={styles.right}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <h5>{product.price}</h5>
                <h6>{product.category}</h6>
                <div className={styles.rating}>
                    <p><strong>Rating:</strong> <span>{product.rating.rate}/5 {`(${product.rating.count})`}</span></p>
                </div>
            </div>
        </div>
      )}
    </PublicLayout>
  );
}
