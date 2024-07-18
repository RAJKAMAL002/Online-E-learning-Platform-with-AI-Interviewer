import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginForm = ({ loginAPI }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [student, setStudent] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const Login = (event) => {
    event.preventDefault();
    if (
      email === "" ||
      password === "" ||
      (student === false && teacher === false) ||
      (student === true && teacher === true)
    )
      return setError("Please, fill all the details");

    setError(null);
    loginAPI({ email, password, student, teacher, setError });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[120px] w-full bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
        <form onSubmit={Login}>
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
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="flex items-center justify-between">
            <button
              className="bg-tempCol hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link
              to="#"
              className="inline-block align-baseline font-bold text-sm text-tempCol hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-tempCol hover:text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
