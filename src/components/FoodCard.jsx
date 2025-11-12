import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const FoodCard = ({ food }) => {
  const { user, signOutUser } = useContext(AuthContext);

  console.log("User Email:", user?.email);
  console.log("User Photo:", user?.photoURL);
  console.log("User Name:", user?.displayName);

  const navigate = useNavigate();
  const {
    _id,
    food_image,
    food_name,

    food_quantity,
    pickup_location,
    expire_date,
  } = food;

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition transform hover:scale-[1.02] hover:shadow-xl cursor-pointer w-full">
      <img src={food_image} alt="" className="w-full h-66 object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{food_name}</h2>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt=""
            className="w-5 h-5 rounded-full"
          />
          <span>{user?.displayName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>👥</span>
          <span>{food_quantity}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>📍</span>
          <span className="capitalize">{pickup_location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>📅</span>
          <span>Expires: {expire_date}</span>
        </div>

        <button
          onClick={() => navigate(`/food-details/${_id}`)}
          className="w-full my-btn  transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
