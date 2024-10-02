import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useFoodCategory } from "./store/FoodCategory.js";
import { Home, Nav, Footer, Admin, Cart } from "./utils/utils";

import RestrurantData from "./components/RestrurantDetail/RestrurantData.jsx";
import Payment from "./components/Cart/Payment.jsx";
import Myorder from "./components/UserOrder/Myorder.jsx";
function App() {
  const location = useLocation();
  const { fetchCategory } = useFoodCategory();
  const [isVisiblaeNavFooter, setisVisiblaeNavFooter] = useState(null);

  useEffect(() => {
    try {
      fetchCategory();
    } catch (error) {
      console.log(error);
    }
  }, [fetchCategory]);

  useEffect(() => {
    setisVisiblaeNavFooter(location.pathname.startsWith("/admin"));
  }, [location.pathname]);

  if (isVisiblaeNavFooter === null) return <></>;

  return (
    <div className="w-full h-full">
      {!isVisiblaeNavFooter && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restrurant/:id" element={<RestrurantData />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/myorders" element={<Myorder />} />
      </Routes>
      {!isVisiblaeNavFooter && <Footer />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />
    </div>
  );
}

export default App;
