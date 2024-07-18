import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import profileImg from "../assets/image/profileImg.jpg";
import { UpdateUserDetails } from "./UpdateUserDetails";
import { Link, useNavigate } from "react-router-dom";
import { Dashboard_course } from "./Dashboard_course";
import { contextData } from "../context/CreateContext";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { pos, id } = useContext(contextData);

  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/login"); // Redirect to login if no id
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get(
          `http://localhost:8000/profile?id=${id}&pos=${pos}`
        );
        setUser(profileResponse.data[0]);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const coursesResponse = await axios.get(
          `http://localhost:8000/uploaded-course?id=${id}&pos=${pos}`
        );
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchProfile();
    fetchCourses();
  }, [id, pos, navigate, update]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("userdata", "");
    navigate("/login");
  };

  return (
    <div className="flex  items-start gap-4 w-full min-h-[80vh]">
      <div className="col-span-1 p-4 bg-white rounded-xl h-full shadow-md w-full md:w-1/5">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={
              user.profile_pic
                ? `http://localhost:8000/${user.profile_pic.slice(8)}`
                : profileImg
            }
            alt="Profile"
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <button
            className="mt-4 text-white bg-blue-500 py-2 px-4 rounded-lg duration-200 hover:bg-blue-700"
            onClick={() => setUpdate(!update)}
          >
            {!update ? "Edit Profile" : "Go Back"}
          </button>
        </div>
        <div className="flex justify-center items-center mt-20">
          <div className="flex flex-col">
            <Link className="flex items-center" to="/">
              <i className="fa-solid fa-house text-tempCol"></i>
              <span className="block p-3 duration-300 hover:text-tempCol">
                Home
              </span>
            </Link>
            <Link className="flex items-center" to="/teacher/course-upload">
              <i className="fa-solid fa-chalkboard-user text-tempCol"></i>
              <span className="block p-3 duration-300 hover:text-tempCol">
                Create Course
              </span>
            </Link>
            <Link className="flex items-center" to="/analytics">
              <i className="fa-solid fa-chart-simple text-tempCol"></i>
              <span className="block p-3 duration-300 hover:text-tempCol">
                Analytics
              </span>
            </Link>
            <Link
              className="flex items-center"
              to="/login"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket text-tempCol"></i>
              <span className="block p-3 duration-300 hover:text-tempCol">
                Logout
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="col-span-2 p-10 bg-white rounded-xl shadow-md w-full md:w-4/5">
        {!update ? (
          <Dashboard_course courses={courses} />
        ) : (
          <UpdateUserDetails
            pos={pos}
            userdata={user}
            id={id}
            updatefun={setUpdate}
          />
        )}
      </div>
    </div>
  );
};
