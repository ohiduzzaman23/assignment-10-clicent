import React, { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logoImage from "/food-share-logo.png";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        console.log("User logged out");
      })
      .catch((err) => console.error(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-medium navBg ">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/available-foods" className="font-medium navBg">
          Available Foods
        </NavLink>
      </li>

      {/* Private Routes  */}
      {user && (
        <>
          <li>
            <NavLink to="/add-food" className="font-medium navBg">
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-foods" className="font-medium px-4 navBg">
              Manage My Foods
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-requests" className="font-medium navBg">
              My Food Requests
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100/70 border-b border-b-gray-300 sticky top-0 z-50 backdrop-blur-sm">
      <div className="navbar container w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBars className="text-xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoImage}
              alt="logo"
              className="w-15 animate-fadeInScale"
            />
            <span className="text-xl font-bold">FoodShare</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {!user ? (
            <Link
              to="/login"
              className="btn border-[#24C7F5] hover:bg-[#24C7F5] hover:text-white"
            >
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL || "https://i.ibb.co.com/vBzM6pZ/user.png"
                    }
                    alt="user"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <p className="font-semibold text-center">
                    {user?.displayName || "User"}
                  </p>
                </li>
                <div className="divider my-1"></div>

                <li>
                  <NavLink
                    to="/profile"
                    className="font-medium px-4 py-2.5 hover:bg-[#24C7F5] hover:text-white"
                  >
                    My Profile
                  </NavLink>
                </li>

                <div className="divider my-1"></div>
                {navLinks}
                <div className="divider my-1"></div>

                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-sm w-full flex items-center justify-center gap-2 text-white"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
