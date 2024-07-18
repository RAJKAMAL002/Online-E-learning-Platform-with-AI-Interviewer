import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SearchBar = ({ data }) => {
  const [text, setText] = useState("");
  const [view, setView] = useState("hidden");
  const filteredData = data.filter(
    (item) =>
      item.course.toLowerCase().includes(text.toLowerCase()) ||
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.course_domain.toLowerCase().includes(text.toLowerCase()) ||
      item.course_title.toLowerCase().includes(text.toLowerCase())
  );
  const removeSearch = () => setView("hidden");
  document.body.addEventListener("click", removeSearch);

  return (
    <div className="flex flex-col items-center relative">
      <div className="flex shadow-md items-center justify-center w-[60%] bg-slate-100 mt-12 mb-4 duration-300">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setView("block");
            setText(e.target.value);
          }}
          className="w-full px-5 py-4 outline-none bg-transparent"
          placeholder="Search by course name, mentor, domain..."
        />
        <i className="fa-solid fa-magnifying-glass mx-5"></i>
      </div>

      <Link
        to=""
        className={`w-[60%] bg-white shadow-md rounded-lg ${view} absolute top-[7rem]`}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="py-3 px-5 hover:bg-gray-100 flex justify-between items-center"
            >
              <h2 className="">{item.course_title}</h2>
              <p className="text-[.7rem] text-gray-500">{item.name}</p>
            </div>
          ))
        ) : (
          <div className="py-2 text-center text-gray-500">
            No courses found.
          </div>
        )}
      </Link>
    </div>
  );
};
