import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useFoodCategory } from "./store/FoodCategory.js";
import { Home, Nav, Footer,Admin,Dashboard } from "./utils/utils";
import { useAllresturent } from "./store/GetallResturants.js";
function App() {
  const { fetchCategory } = useFoodCategory();
  const { fetchresturent } = useAllresturent();
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

  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
