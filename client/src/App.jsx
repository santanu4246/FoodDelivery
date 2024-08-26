import { useEffect } from "react";
import "./App.css";
import { useFoodCategory } from "./store/FoodCategory.js";

import { Home,Nav,Footer } from "./utils/utils";
import { useAllresturent } from "./store/GetallResturants.js";
function App() {
  const { fetchCategory } = useFoodCategory();
  const {fetchresturent} = useAllresturent()
  useEffect(() => {
    try {
      fetchCategory();
    } catch (error) {
      console.log(error);
    }
  }, [fetchCategory]);

useEffect(()=>{
try {
  fetchresturent()
} catch (error) {
  console.log(error);
}
},[fetchresturent])
  return (
    <div className="w-full h-full">
      <Nav/>
      <Home />
      <Footer/>
    </div>
  );
}

export default App;
