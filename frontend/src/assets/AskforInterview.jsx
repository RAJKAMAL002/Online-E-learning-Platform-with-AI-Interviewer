import React, { useState } from "react";
import { Link } from "react-router-dom"; // Add this import for Link
import { useNavigate } from "react-router-dom";

export const AskforInterview = ({ username }) => {
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Selected subject: ${subject}`);
    navigate(`/interview/${subject}`);
  };

  return (
    <div className="max-w-md mx-auto mt-20 py-8 px-10 bg-white rounded-lg shadow-md">
      <div className="text-center mb-7 text-[20px]">
        {localStorage.getItem("username") !== "" ? (
          <div>
            <span className="text-yellow-400 mr-2">
              <i className="fa-solid fa-face-smile"></i>
            </span>
            <span className="font-semibold">{`Hey ${
              JSON.parse(localStorage.getItem("username")).name
            }`}</span>
          </div>
        ) : (
          <Link
            to="/login"
            className=" text-tempCol font-semibold px-10 py-2 text-[1.2rem]  rounded-lg  duration-300 cursor-pointer"
          >
            Login for interview
          </Link>
        )}
      </div>
      <h2 className="text-2xl font-semibold mb-5 text-center">
        Choose Your Interview Preparation Course
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Subject/Course
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="" disabled>
              Select your subject/course
            </option>
            <option value="coding">Coding</option>
            <option value="content_marketing">Content Marketing</option>
            <option value="content_writing">Content Writing</option>
            <option value="finance">Finance</option>
            <option value="fitness">Fitness</option>
            <option value="photography">Photography</option>
            <option value="teaching">Teaching</option>
            <option value="ui_ux_design">UI/UX Design</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#754FFE] text-white py-2 px-4 rounded-full hover:bg-opacity-90 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
