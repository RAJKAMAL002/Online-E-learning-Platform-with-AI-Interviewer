import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { contextData } from "../context/CreateContext";

export const Navbar = () => {
  const [dropdown, setDropdown] = useState(0);
  const username = useContext(contextData);
  console.log(username);
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/profile";
  return (
    <div className="flex items-center justify-center relative w-full h-[5rem]">
      <Link
        to={"/"}
        className="text-tempCol font-bold text-[2rem] absolute left-0"
      >
        GetHired
      </Link>
      <div className=" max-md:hidden">
        <Link to={"/"} className="mx-3 text-[1.1rem]">
          Home
        </Link>
        <Link to={"/learn"} className="mx-3 text-[1.1rem]">
          Learn
        </Link>
        <Link to={"/explore"} className="mx-3 text-[1.1rem]">
          Explore
        </Link>
        <Link to={"/about"} className="mx-3 text-[1.1rem]">
          About Us
        </Link>
      </div>
      {shouldShowNavbar && (
        <div className=" max-md:hidden absolute right-0">
          {username ? (
            <div className="text-tempCol font-semibold px-10 py-2 text-[1.2rem]  rounded-lg hover:scale-105 duration-300 cursor-pointer">
              <i className="fa-solid fa-user"></i>
              <Link to={`/profile`} className="ml-2">
                {username.name}
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-tempCol text-tempCol font-semibold px-10 py-3 text-[1.2rem] rounded-lg hover:bg-tempCol hover:text-white duration-300 cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      )}

      <div class="absolute right-0">
        <button
          onClick={() => setDropdown(!dropdown)}
          class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 hidden max-md:block"
        >
          <i class="fa-solid fa-bars"></i>
        </button>

        <div
          class={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 ${
            !dropdown ? "hidden" : ""
          }`}
        >
          <a class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            <Link to={"/"} className="mx-3">
              Home
            </Link>
          </a>
          <a class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            <Link to={"/learn"} className="mx-3 ">
              Learn
            </Link>
          </a>
          <a class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            <Link to={"/explore"} className="mx-3 ">
              Explore
            </Link>
          </a>
          <a class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            <Link to={"/about"} className="mx-3 ">
              About Us
            </Link>
          </a>
        </div>
      </div>
    </div>
  );
};
