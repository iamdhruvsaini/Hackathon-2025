import React from "react";
import { BasketRadialChart } from "./BasketRadialChart";
import { Link } from "react-router-dom";

const BasketCard = ({ option }) => {
  return (
    <div className="p-[1px] bg-cyan-500 rounded-xl">
      <div className="p-4 rounded-xl bg-gray-50 h-full">
        <div>
          <BasketRadialChart option={option}/>
        </div>
        <Link to={option.link}>
          <h3 className="mb-2 text-xl font-bold text-center text-blue-600 hover:underline">
            {option.position_bucket}
          </h3>
        </Link>
        <p className="text-gray-500 dark:text-gray-400 text-center">{option.description}</p>
      </div>
    </div>
  );
};

export default BasketCard;
