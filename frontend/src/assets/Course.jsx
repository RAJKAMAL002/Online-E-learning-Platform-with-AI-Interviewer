import React from "react";
import { useParams } from "react-router-dom";
import courseList from "../../courses.json";
export const Course = () => {
  const { course } = useParams();
  const courseData = courseList.find((val) => course === val.courseName);
  return (
    <div>
      <div>
        {courseData.courses.map((val) => {
          return <button>{val.title}</button>;
        })}
      </div>
    </div>
  );
};
