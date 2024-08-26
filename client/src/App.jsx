import { useEffect, useState } from "react";
import {  Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useFoodCategory } from "./store/FoodCategory.js";
import { Home, Nav, Footer, Admin, Dashboard } from "./utils/utils";
import { useAllresturent } from "./store/GetallResturants.js";
function App() {
  const location = useLocation();
  const { fetchCategory } = useFoodCategory();
  const { fetchresturent } = useAllresturent();
  const [isVisiblaeNavFooter, setisVisiblaeNavFooter] = useState(true);
  useEffect(() => {
    try {
      fetchCategory();
    } catch (error) {
      console.log(error);
    }
  }, [fetchCategory]);

  useEffect(() => {
    try {
      fetchresturent();
    } catch (error) {
      console.log(error);
    }
  }, [fetchresturent]);

  useEffect(() => {
    setisVisiblaeNavFooter(location.pathname === "/admin");
  }, []);
  return (
    <div className="w-full h-full">
      {!isVisiblaeNavFooter && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      {!isVisiblaeNavFooter && <Footer />}
    </div>
  );
}

export default App;
