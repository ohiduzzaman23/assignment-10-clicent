import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br bg-[#FCFBF8] text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-sky-600 drop-shadow-lg overflow-hidden whitespace-nowrap border-r-4 border-r-sky-600 typing">
          Profile feature under development.
        </h1>

        <p className="mt-5 text-lg text-white/90 animate-pulse">
          Stay tuned! We’re crafting something amazing for you
        </p>

        <div className="mt-10">
          <button
            //   onClick={handleNotify}
            className="btn my-btn animate-[pulse_2s_infinite]"
          >
            Notify Me
          </button>
        </div>

        <div className="absolute bottom-6 text-gray-500 text-sm animate-pulse">
          Developed by <span className="font-bold">Ohiduzzaman sobuj 💎</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
