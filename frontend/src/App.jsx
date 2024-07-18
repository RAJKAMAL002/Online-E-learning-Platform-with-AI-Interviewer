import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./assets/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginForm } from "./assets/LoginForm";
import { RegisterForm } from "./assets/RegisterForm";
import { Home } from "./assets/Home";
import { AskforInterview } from "./assets/AskforInterview";
import Footer from "./assets/Footer";
import { Course } from "./assets/Course";
import { Teacher_home } from "./assets/Teacherpanel/Teacher_home";
import TeacherCourseUpload from "./assets/Teacherpanel/CourseUpload";
import { Domain_card_panel } from "./assets/Domain_card_panel";
import { Dashboard } from "./assets/Dashboard";
import { contextData } from "./context/CreateContext";
import { UploadCoursePlaylist } from "./assets/Teacherpanel/UploadCoursePlaylist";
import { VideoPanel } from "./assets/VideoPanel";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userdata") || "null")
  );
  const navigate = useNavigate();

  const Login = ({ email, password, student, teacher, setError }) => {
    axios
      .post("http://localhost:8000/login", {
        email,
        password,
        student,
        teacher,
      })
      .then((res) => {
        if (res.data.found) {
          const data = { pos: res.data.pos, ...res.data.name[0] };
          setUser(data);
          localStorage.setItem("userdata", JSON.stringify(data));
          if (res.data.pos === "teacher") {
            navigate("/teacher");
          } else {
            navigate("/");
          }
        } else {
          setError("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Login failed. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center w-[85vw] max-md:w-[93vw]">
        <contextData.Provider value={user}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm loginAPI={Login} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/interview" element={<AskforInterview />} />
            <Route
              path="/course/:domain"
              element={<Domain_card_panel search={true} />}
            />
            <Route
              path="/course/:domain/video-panel"
              element={<VideoPanel />}
            />
            <Route path="/profile" element={<Dashboard />} />
            <Route
              path="edit-playlist/:course_id"
              element={<UploadCoursePlaylist />}
            />
            <Route path="/interview/:course" element={<Course />} />
            <Route path="/teacher" element={<Teacher_home />}>
              <Route path="course-upload" element={<TeacherCourseUpload />} />
            </Route>
          </Routes>
          <Footer />
        </contextData.Provider>
      </div>
    </div>
  );
}

export default App;
