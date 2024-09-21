import React, { useEffect } from "react";
import { UserAuth } from "../../store/UserAuth";

function RestuCard({ item }) {
  return <div className=""></div>;
}

function Cart() {
  const { getCart, cart } = UserAuth();
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return <div className=""></div>;
}

export default Cart;
