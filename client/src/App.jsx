import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useFoodCategory } from "./store/FoodCategory.js";
import { Home, Nav, Footer, Admin, Dashboard } from "./utils/utils";
import RestaurantDetail from "./components/AdminPanel/adminRoutes/RestrurantDetail.jsx";
import RestrurantData from "./components/RestrurantDetail/RestrurantData.jsx";
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
      </Routes>
      {!isVisiblaeNavFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
