import React from "react";
import { Con1Teacher } from "./Con2";
import { Card1 } from "./Card1";
import { Routes, Route, useLocation } from "react-router-dom";
import TeacherCourseUpload from "./CourseUpload";
export const Teacher_home = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className=" w-full">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Con1Teacher />
              <Card1 />
            </>
          }
        />
        <Route path="/course-upload" element={<TeacherCourseUpload />} />
      </Routes>
    </div>
  );
};
