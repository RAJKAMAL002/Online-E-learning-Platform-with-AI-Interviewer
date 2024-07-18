import React from "react";
import { Link } from "react-router-dom";
import headerImg from "./image/header_img.jpg";

export const Con1 = () => {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1">
      <div className="w-full flex flex-col justify-center max-md:items-center">
        <div className=" py-3">
          <h1 className=" text-[3.5rem] font-bold leading-tight max-md:text-center">
            Let's make your career
            <span className=" text-tempCol"> aspirations a reality</span>
          </h1>
        </div>
        <div className=" text-[1.3rem] text-gray-500 font-semibold py-3 max-md:text-center">
          Your dream job is within reach when preparation meets opportunity.
          Let's make your career aspirations a reality.
        </div>
        <div className=" py-3">
          <ul>
            <li>
              <span className=" bg-green-500 text-white px-1 py-[.2rem] rounded-full text-[.4rem] mr-1">
                <i class="fa-solid fa-check"></i>
              </span>
              <span className=" text-[.9rem] text-gray-500">
                Guidenace 24/7
              </span>
            </li>
            <li>
              <span className=" bg-green-500 text-white px-1 py-[.2rem] rounded-full text-[.4rem] mr-1">
                <i class="fa-solid fa-check"></i>
              </span>
              <span className=" text-[.9rem] text-gray-500">
                A1 Preparation
              </span>
            </li>
            <li>
              <span className=" bg-green-500 text-white px-1 py-[.2rem] rounded-full text-[.4rem] mr-1">
                <i class="fa-solid fa-check"></i>
              </span>
              <span className=" text-[.9rem] text-gray-500">
                Test Preparation
              </span>
            </li>
            <li>
              <span className=" bg-green-500 text-white px-1 py-[.2rem] rounded-full text-[.4rem] mr-1">
                <i class="fa-solid fa-check"></i>
              </span>
              <span className=" text-[.9rem] text-gray-500">
                100+ Carrier Advice
              </span>
            </li>
          </ul>
        </div>
        <div className=" py-14">
          <Link
            className=" text-white bg-[#040417] py-5 px-24 rounded-lg text-[1.3rem] duration-200 hover:bg-[#232356]"
            to={"/interview"}
          >
            Test Yourself
          </Link>
        </div>
      </div>
      <div className=" flex items-center justify-center">
        <img
          className=" h-[80%] max-md:h-[full] rounded-xl"
          src={headerImg}
          alt=""
        />
      </div>
    </div>
  );
};
