import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";

const CartPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <Cart />
    </>
  );
};

export default CartPage;
