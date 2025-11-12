import React from "react";
import Works from "./Works";
import Slider from "../components/common/Slider";
import Mission from "./Mission";
import { useLoaderData } from "react-router";
import FoodCard from "../components/FoodCard";

const Home = () => {
  const data = useLoaderData();
  return (
    <div>
      <div>
        <Slider></Slider>
      </div>
      {/* Featured Foods Section */}
      <div className="">
        <h2 className="text-3xl text-center font-bold mt-10">Featured Foods</h2>
        <div className="my-8 my_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((food) => (
            <FoodCard key={food._id} food={food}></FoodCard>
          ))}
        </div>
      </div>
      {/* How It Works Section */}
      <div>
        <Works></Works>
      </div>

      <div>
        <Mission></Mission>
      </div>
    </div>
  );
};

export default Home;
