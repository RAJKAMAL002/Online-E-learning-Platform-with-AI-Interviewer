import React from "react";
import { Link } from "react-router-dom";
export const Card = ({
  img,
  title,
  rating,
  video,
  time,
  mentor,
  button,
  link,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 hover:shadow-2xl  duration-300">
      <img src={img} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className=" flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold ">{title}</h2>
          <span className=" text-sm text-gray-500">{mentor}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <span className="text-yellow-500">
            <i className="fa-solid fa-star"></i>
          </span>
          <span className="ml-1">{rating}</span>
          <span className="ml-1 text-sm text-gray-500">{video}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-4">
          <span className="text-sm text-gray-500">{time} hours</span>
        </div>
        <Link
          to={link}
          className="bg-tempCol text-white py-2 px-4 rounded-full hover:bg-[#9172ff] transition duration-200 ease-in-out"
        >
          {button}
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </Link>
      </div>
    </div>
  );
};
