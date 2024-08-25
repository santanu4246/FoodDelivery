import { useEffect } from "react";
import "./App.css";
import { useFoodCategory } from "./store/FoodCategory.js";
import { Home,Nav,Footer } from "./utils/utils";
function App() {
  const { fetchCategory } = useFoodCategory();
  useEffect(() => {
    try {
      fetchCategory();
    } catch (error) {
      console.log(error);
    }
  }, [fetchCategory]);
  return (
    <div className="w-full h-full">
      <Nav/>
      <Home />
      <Footer/>
    </div>
  );
}

export default App;
