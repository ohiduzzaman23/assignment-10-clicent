import React from "react";
import { useNavigate } from "react-router";
import { Eye } from "lucide-react";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition transform hover:scale-[1.02] hover:shadow-xl cursor-pointer w-full">
      <img
        src={food.food_image}
        alt={food.food_name}
        className="w-full h-66 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {food.food_name}
        </h2>

        {/* Author */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img
            src={
              food.authorImg ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={food.author || "Anonymous"}
            className="w-5 h-5 rounded-full"
          />
          <span>{food.author || "Anonymous"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>👥</span>
          <span>{food.food_quantity}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>📍</span>
          <span className="capitalize">{food.pickup_location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>📅</span>
          <span>Expires: {food.expire_date}</span>
        </div>

        <button
          onClick={() => navigate(`/food-details/${food._id}`)}
          className="w-full my-btn transition"
        >
          <Eye className="inline w-4 h-4 mr-1" /> View Details
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
