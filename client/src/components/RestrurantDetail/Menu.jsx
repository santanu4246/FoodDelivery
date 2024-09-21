import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../../store/Cart";
import { useMenu } from "../../store/Menu";

const Menu = () => {
  const { id } = useParams();

  const { MenuWithFoodList, getMenuWithFoodList } = useMenu();

  useEffect(() => {
    if (id) getMenuWithFoodList(id);
  }, [id]);

  return (
    <div className="mt-8 flex flex-col md:flex-row md:gap-10">
      {/* Left: Menu Titles */}
      <div className="w-full md:w-1/3">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Menu</h3>
        <div className="space-y-3">
          {MenuWithFoodList.map((item, index) => {
            return (
              <div className="" key={index}>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Food Items for the Selected Title */}
      <div className="w-full md:w-2/3 mt-8 md:mt-0"></div>
    </div>
  );
};

export default Menu;
