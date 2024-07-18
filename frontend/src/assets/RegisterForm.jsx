import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [student, setStudent] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [course, setCourse] = useState("");
  const [qualification, setQualification] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const Register = (event) => {
    event.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      (student === false && teacher === false) ||
      (student === true && teacher === true) ||
      (teacher === true && (course === "" || qualification === ""))
    )
      return setError("Please, fill all the details");

    setError(null);
    console.log(name, email, password, student, teacher, qualification, course);
    axios
      .post("http://localhost:8000/register", {
        name,
        email,
        password,
        student,
        teacher,
        course,
        qualification,
      })
      .then((res) => {
        console.log("Registration successful", res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[120px]  w-full">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Register</h2>
        <form onSubmit={Register}>
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
          {teacher && (
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
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-between w-[50%]">
              <div className="flex items-center">
                <input
                  onChange={(e) => setStudent(!student)}
                  type="checkbox"
                  id="student"
                  className="mr-2"
                />
                <label htmlFor="student">Student</label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={(e) => setTeacher(!teacher)}
                  type="checkbox"
                  id="teacher"
                  className="mr-2"
                />
                <label htmlFor="teacher">Coach</label>
              </div>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-tempCol hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>

            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-tempCol hover:text-blue-800"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
