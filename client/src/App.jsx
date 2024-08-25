import { useEffect } from "react";
import "./App.css";
import { useFoodCategory } from "./store/FoodCategory.js";
import { Home,Nav } from "./utils/utils";
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
    <div className="w-full h-full px-[15%]">
      <Nav/>
      <Home />
    </div>
  );
}

export default App;
