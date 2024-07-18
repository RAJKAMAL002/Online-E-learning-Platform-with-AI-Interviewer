import axios from "axios";
import React, { useState } from "react";
import profileImg from "../assets/image/profileImg.jpg";

export const UpdateUserDetails = ({ pos, userdata, id, updatefun }) => {
  const [name, setName] = useState(userdata.name);
  const [email, setEmail] = useState(userdata.email);
  const [course, setCourse] = useState(userdata.course);
  const [qualification, setQualification] = useState(userdata.qualification);
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const ImgHandler = (e) => {
    e.preventDefault();

    axios
      .put(
        "http://localhost:8000/picupdate",
        { profilePic, pos, id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        updatefun((e) => !e);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EventHandeler = (e) => {
    e.preventDefault();

    const formdata = {
      name,
      email,
      course,
      qualification,
      pos,
      id,
    };

    console.log(formdata);

    axios
      .put("http://localhost:8000/updatedetails", formdata)
      .then((res) => {
        console.log(res.data);
        updatefun((e) => !e);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-8 text-center">Update Details</h2>
      <form action="" onSubmit={ImgHandler}>
        <div className="mb-6 flex  justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="file">
              <img
                src={profileImg}
                className=" w-24 h-24 rounded-full m-5"
                alt=""
              />
            </label>
            <input
              type="file"
              className=" hidden"
              id="file"
              onChange={handleFileChange}
            />
          </div>
          <button
            className="bg-tempCol hover:bg-blue-800 text-white text-[12px] font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>

      <form onSubmit={EventHandeler}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {pos === "teacher" && (
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="course"
              >
                Course Faculty
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="course"
                type="text"
                placeholder="Enter subject"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="qualification"
              >
                Qualification
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="qualification"
                type="text"
                placeholder="Enter qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-tempCol hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};
