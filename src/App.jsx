import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import LoadingPage from "./pages/loadingPage/LoadingPage";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* <Route path='/loader' element={<LoadingPage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
