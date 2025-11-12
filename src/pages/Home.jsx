import React from "react";
import Works from "./Works";
import Mission from "./Mission";
import { useLoaderData, useNavigate } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import BannerSection from "../components/common/BannerSection";

const Home = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleShowAll = () => {
    navigate("/available-foods");
  };

  return (
    <div>
      {/* Banner Section */}
      <div>
        <BannerSection />
      </div>

      {/* Featured Foods Section */}
      <div>
        <h2 className="text-3xl text-center font-bold mt-10">Featured Foods</h2>

        <div className="my-10 my_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>

        {/* Show All Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleShowAll}
            className=" px-8 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-400 transition-all"
          >
            Show All
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <div>
        <Works />
      </div>

      {/* Mission Section */}
      <div>
        <Mission />
      </div>
    </div>
  );
};

export default Home;
