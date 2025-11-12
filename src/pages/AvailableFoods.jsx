import React from "react";
import FoodDetails from "./FoodDetails";
import { useLoaderData } from "react-router";
import FoodCard from "../components/FoodCard";

const AvailableFoods = () => {
  const data = useLoaderData();
  // console.log(data);
  return (
    <div className="">
      <div className="my-8 my_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
