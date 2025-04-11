import React, { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import { publicCommunication } from "../../communication/publicCommunication";
import LoadingPage from "../loadingPage/LoadingPage";
import styles from "./Home.module.css";
import { useAuth } from "../../context/AuthContext";
import ProductCard from "../../components/ProductCard";
import NotFoundNoLayout from "../notFound/NotFoundNoLayout";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentCat, setCurrentCat] = useState("");
  const { search, setSearch } = useAuth();

  const getAllProducts = async () => {
    const data = await publicCommunication.getAllProducts();
    if (data) {
      setProducts(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      const cat = [...new Set(data?.map((p) => p.category))];
      setCategories(cat);
      setCurrentCat("");
    }
  };

  const getByCategory = async (cat) => {
    if (currentCat === cat) {
      await getAllProducts();
      return;
    }
    setLoading(true);
    const data = await publicCommunication.getProductsByCategory(cat);
    if (data) {
      setProducts(data);
      setCurrentCat(cat);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    setFilter((prev) => {
      const newArr = products.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search)
      );
      return newArr;
    });
  }, [search, products]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <PublicLayout>
      {loading ? (
        <LoadingPage />
      ) : filter.length ? (
        <>
          <section className={styles.cat}>
            {categories.map((c, i) => (
              <h5
                className={currentCat === c ? styles.active : ""}
                onClick={() => getByCategory(c)}
                key={i}
              >
                {c}
              </h5>
            ))}
          </section>
          <div className={styles.products}>
            {filter.length > 0 &&
              filter?.map((p, i) => {
                if (
                  p.title.toLowerCase().includes(search.toLowerCase()) ||
                  p.description.toLowerCase().includes(search.toLowerCase()) ||
                  p.category.toLowerCase().includes(search.toLowerCase())
                ) {
                  return <ProductCard key={i} p={p} />;
                }
              })}
          </div>
        </>
      ) : (
        <NotFoundNoLayout title="No Match Found !" />
      )}
    </PublicLayout>
  );

  // if (loading) {
  //   return (
  //     <PublicLayout>
  //       <LoadingPage />
  //     </PublicLayout>
  //   );
  // }

  // return (
  //   <PublicLayout>
  //     <section className={styles.cat}>
  //       {categories.map((c, i) => (
  //         <h5
  //           className={currentCat === c ? styles.active : ""}
  //           onClick={() => getByCategory(c)}
  //           key={i}
  //         >
  //           {c}
  //         </h5>
  //       ))}
  //     </section>
  //     <div className={styles.products}>
  //       {filter.length > 0 &&
  //         filter?.map((p, i) => {
  //           if (
  //             p.title.toLowerCase().includes(search.toLowerCase()) ||
  //             p.description.toLowerCase().includes(search.toLowerCase()) ||
  //             p.category.toLowerCase().includes(search.toLowerCase())
  //           ) {
  //             return <ProductCard key={i} p={p} />;
  //           }
  //         })}
  //     </div>
  //     {!loading && filter.length <= 0 && (
  //       <div className={styles.notFound}>
  //         <h3>No Result Found !</h3>
  //       </div>
  //     )}
  //   </PublicLayout>
  // );
}
