import React from "react";
import { Link } from "react-router-dom";

export const Card1 = () => {
  const username = localStorage.getItem("userdata");

  return (
    <div className="flex items-center justify-between shadow-slate-300 shadow-md px-10 py-16">
      <div className="flex justify-center items-center text-[30px]">
        <i className="fa-solid fa-chalkboard-user"></i>
        <div className="ml-4">Jump Into Course Creation</div>
      </div>
      <Link
        className="text-white bg-tempCol py-5 px-24 rounded-lg text-[1.3rem] duration-200 hover:bg-[#232356]"
        to={username ? "/teacher/course-upload" : "/login"}
      >
        Create your course
      </Link>
    </div>
  );
};
